/**
 * Biometric Flow Validator
 * Validates biometricFlow.json structure according to schema v0.3
 */

export interface ValidationError {
  code: string;
  path: string;
  message: string;
  details?: string;
}

export interface ValidationWarning {
  code: string;
  path: string;
  message: string;
  details?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

type BiometricFlow = any; // JSON structure

// Error codes
const E_TIME_ORDER = 'E_TIME_ORDER';
const E_CONSENT_MISSING = 'E_CONSENT_MISSING';
const E_LINK_REF = 'E_LINK_REF';
const E_MASK_KEYS = 'E_MASK_KEYS';
const E_FUNC_PARAMS = 'E_FUNC_PARAMS';
const E_RR_EMPTY = 'E_RR_EMPTY';
const E_INVALID_SCHEMA_VERSION = 'E_INVALID_SCHEMA_VERSION';
const E_INVALID_SOURCE = 'E_INVALID_SOURCE';
const E_INVALID_DURATION = 'E_INVALID_DURATION';
const E_INVALID_SAMPLING = 'E_INVALID_SAMPLING';
const E_DUPLICATE_LAYER_ID = 'E_DUPLICATE_LAYER_ID';
const E_INVALID_LAYER_TYPE = 'E_INVALID_LAYER_TYPE';
const E_MISSING_FIELD = 'E_MISSING_FIELD';
const E_INVALID_RANGE = 'E_INVALID_RANGE';
const E_INVALID_ENUM = 'E_INVALID_ENUM';
const E_INVALID_COLOR = 'E_INVALID_COLOR';
const E_SIGNAL_QUALITY = 'E_SIGNAL_QUALITY';

// Warning codes
const W_SIGNAL_POOR = 'W_SIGNAL_POOR';
const W_EMOTION_INCONSISTENT = 'W_EMOTION_INCONSISTENT';
const W_HRV_SAMPLING_LOW = 'W_HRV_SAMPLING_LOW';
const W_COLOR_FALLBACK = 'W_COLOR_FALLBACK';
const W_THEME_MISSING = 'W_THEME_MISSING';

const REQUIRED_MASK_KEYS = [
  'isOverwhelmed',
  'isSafe',
  'isMindful',
  'isFocused',
  'isConnected',
  'isGrateful',
  'isLonely',
  'isInspired'
];

const SCHEMA_VERSION_PATTERN = /^\d+\.\d+\.\d+$|^\d+\.\d+$|^\d+$/;
const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

function createError(code: string, path: string, message: string, details?: string): ValidationError {
  return { code, path, message, details };
}

function createWarning(code: string, path: string, message: string, details?: string): ValidationWarning {
  return { code, path, message, details };
}

function validateSchemaVersion(version: any, errors: ValidationError[]) {
  if (typeof version !== 'string' || !SCHEMA_VERSION_PATTERN.test(version)) {
    errors.push(createError(
      E_INVALID_SCHEMA_VERSION,
      'flow.schema_version',
      'Schema version must match pattern ^\\d+\\.\\d+\\.\\d+$|^\\d+\\.\\d+$|^\\d+$',
      String(version)
    ));
  }
}

function validateSource(source: any, errors: ValidationError[]) {
  const validSources = ['sim', 'recorded', 'mixed'];
  if (!validSources.includes(source)) {
    errors.push(createError(
      E_INVALID_SOURCE,
      'flow.source',
      `Source must be one of: ${validSources.join(', ')}`,
      String(source)
    ));
  }
}

function validateTimeFields(flow: BiometricFlow, errors: ValidationError[]) {
  const { start_ts, end_ts, duration_ms } = flow;

  if (typeof start_ts !== 'number' || !Number.isInteger(start_ts)) {
    errors.push(createError(E_MISSING_FIELD, 'flow.start_ts', 'start_ts must be an integer'));
  }
  if (typeof end_ts !== 'number' || !Number.isInteger(end_ts)) {
    errors.push(createError(E_MISSING_FIELD, 'flow.end_ts', 'end_ts must be an integer'));
  }

  if (typeof start_ts === 'number' && typeof end_ts === 'number') {
    if (end_ts <= start_ts) {
      errors.push(createError(
        E_TIME_ORDER,
        'flow.end_ts',
        'end_ts must be greater than start_ts',
        `start_ts: ${start_ts}, end_ts: ${end_ts}`
      ));
    }

    if (typeof duration_ms === 'number') {
      const expectedDuration = end_ts - start_ts;
      const diff = Math.abs(duration_ms - expectedDuration);
      if (diff > 1) {
        errors.push(createError(
          E_INVALID_DURATION,
          'flow.duration_ms',
          'duration_ms must equal (end_ts - start_ts) within ±1ms',
          `Expected: ${expectedDuration}, got: ${duration_ms}`
        ));
      }
    }
  }
}

function validateSamplingHz(sampling_hz: any, errors: ValidationError[], warnings: ValidationWarning[]) {
  if (!sampling_hz || typeof sampling_hz !== 'object') {
    errors.push(createError(E_MISSING_FIELD, 'flow.sampling_hz', 'sampling_hz is required'));
    return;
  }

  const validKeys = ['breath', 'heart', 'emotion'];
  for (const key of validKeys) {
    if (key in sampling_hz) {
      const value = sampling_hz[key];
      if (typeof value !== 'number' || value <= 0) {
        errors.push(createError(
          E_INVALID_SAMPLING,
          `flow.sampling_hz.${key}`,
          `Sampling rate must be > 0`,
          String(value)
        ));
      }
    }
  }
}

function validateLayerId(layerId: string, layerIds: Set<string>, index: number, errors: ValidationError[]) {
  if (!layerId || typeof layerId !== 'string') {
    errors.push(createError(
      E_MISSING_FIELD,
      `flow.layers[${index}].id`,
      'Layer id must be a non-empty string'
    ));
    return;
  }

  if (layerIds.has(layerId)) {
    errors.push(createError(
      E_DUPLICATE_LAYER_ID,
      `flow.layers[${index}].id`,
      'Layer id must be unique',
      layerId
    ));
  }
  layerIds.add(layerId);
}

function validateLayerType(type: any, index: number, errors: ValidationError[]) {
  const validTypes = ['respiratory', 'cardiovascular', 'affective'];
  if (!validTypes.includes(type)) {
    errors.push(createError(
      E_INVALID_LAYER_TYPE,
      `flow.layers[${index}].type`,
      `Type must be one of: ${validTypes.join(', ')}`,
      String(type)
    ));
  }
}

function validateConfidence(confidence: any, path: string, errors: ValidationError[]) {
  if (typeof confidence !== 'number' || confidence < 0 || confidence > 1) {
    errors.push(createError(
      E_INVALID_RANGE,
      `${path}.confidence`,
      'Confidence must be in range [0, 1]',
      String(confidence)
    ));
  }
}

function validateSignalQuality(signal_quality: any, path: string, errors: ValidationError[], warnings: ValidationWarning[]) {
  if (!signal_quality || typeof signal_quality !== 'object') {
    return;
  }

  const { snr, artifacts, missing_pct } = signal_quality;

  if (typeof snr !== 'number' || snr < 0) {
    errors.push(createError(E_INVALID_RANGE, `${path}.signal_quality.snr`, 'SNR must be ≥ 0', String(snr)));
  }

  if (typeof artifacts !== 'number' || artifacts < 0 || artifacts > 1) {
    errors.push(createError(
      E_INVALID_RANGE,
      `${path}.signal_quality.artifacts`,
      'Artifacts must be in range [0, 1]',
      String(artifacts)
    ));
  }

  if (typeof missing_pct !== 'number' || missing_pct < 0 || missing_pct > 1) {
    errors.push(createError(
      E_INVALID_RANGE,
      `${path}.signal_quality.missing_pct`,
      'missing_pct must be in range [0, 1]',
      String(missing_pct)
    ));
  }

  if (typeof artifacts === 'number' && typeof missing_pct === 'number') {
    if (artifacts + missing_pct > 1.0) {
      errors.push(createError(
        E_SIGNAL_QUALITY,
        `${path}.signal_quality`,
        'artifacts + missing_pct must be ≤ 1.0',
        `Sum: ${artifacts + missing_pct}`
      ));
    } else if (artifacts + missing_pct > 0.5) {
      warnings.push(createWarning(
        W_SIGNAL_POOR,
        `${path}.signal_quality`,
        'Signal quality is poor (artifacts + missing_pct > 0.5)',
        `Sum: ${artifacts + missing_pct}`
      ));
    }

    if (missing_pct > 0.2) {
      warnings.push(createWarning(
        W_SIGNAL_POOR,
        `${path}.signal_quality.missing_pct`,
        'High missing data percentage (> 0.2)',
        String(missing_pct)
      ));
    }
  }
}

function validateRespiratoryData(data: any, path: string, start_ts: number, end_ts: number, errors: ValidationError[]) {
  const { cycle_phase, phase_ts, depth, intensity, rate_bpm } = data;

  const validPhases = ['inhale', 'exhale', 'hold'];
  if (cycle_phase && !validPhases.includes(cycle_phase)) {
    errors.push(createError(
      E_INVALID_ENUM,
      `${path}.data.cycle_phase`,
      `cycle_phase must be one of: ${validPhases.join(', ')}`,
      String(cycle_phase)
    ));
  }

  if (typeof phase_ts === 'number') {
    if (phase_ts < start_ts || phase_ts > end_ts) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${path}.data.phase_ts`,
        `phase_ts must be in range [${start_ts}, ${end_ts}]`,
        String(phase_ts)
      ));
    }
  }

  if (typeof depth === 'number' && (depth < 0 || depth > 1)) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.depth`, 'depth must be in range [0, 1]', String(depth)));
  }

  if (typeof intensity === 'number' && (intensity < 0 || intensity > 1)) {
    errors.push(createError(
      E_INVALID_RANGE,
      `${path}.data.intensity`,
      'intensity must be in range [0, 1]',
      String(intensity)
    ));
  }

  if (typeof rate_bpm === 'number' && (rate_bpm < 2 || rate_bpm > 40)) {
    errors.push(createError(
      E_INVALID_RANGE,
      `${path}.data.rate_bpm`,
      'rate_bpm must be in range [2, 40]',
      String(rate_bpm)
    ));
  }
}

function validateCardiovascularData(
  data: any,
  path: string,
  sampling_hz: any,
  errors: ValidationError[],
  warnings: ValidationWarning[]
) {
  const { bpm, hrv, rmssd, sdnn, rr_ms } = data;

  if (typeof bpm === 'number' && (bpm < 30 || bpm > 220)) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.bpm`, 'bpm must be in range [30, 220]', String(bpm)));
  }

  if (Array.isArray(rr_ms)) {
    if (rr_ms.length === 0) {
      errors.push(createError(E_RR_EMPTY, `${path}.data.rr_ms`, 'rr_ms array cannot be empty if present'));
    } else if (rr_ms.length < 3 || rr_ms.length > 256) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${path}.data.rr_ms`,
        'rr_ms array length must be in range [3, 256]',
        String(rr_ms.length)
      ));
    } else {
      for (const rr of rr_ms) {
        if (typeof rr !== 'number' || rr < 250 || rr > 2000) {
          errors.push(createError(
            E_INVALID_RANGE,
            `${path}.data.rr_ms`,
            'Each rr value must be in range [250, 2000] ms',
            String(rr)
          ));
        }
      }

      if (sampling_hz?.heart && sampling_hz.heart < 100) {
        warnings.push(createWarning(
          W_HRV_SAMPLING_LOW,
          'flow.sampling_hz.heart',
          'HRV metrics require sampling_hz.heart ≥ 100',
          `Current: ${sampling_hz.heart}`
        ));
      }
    }
  } else {
    if (typeof rmssd !== 'number' && typeof sdnn !== 'number') {
      errors.push(createError(
        E_MISSING_FIELD,
        `${path}.data`,
        'Either rr_ms array or rmssd/sdnn must be present'
      ));
    }
  }

  if (typeof hrv === 'number' && hrv < 0) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.hrv`, 'hrv must be ≥ 0', String(hrv)));
  }

  if (typeof rmssd === 'number' && rmssd < 0) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.rmssd`, 'rmssd must be ≥ 0', String(rmssd)));
  }

  if (typeof sdnn === 'number' && sdnn < 0) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.sdnn`, 'sdnn must be ≥ 0', String(sdnn)));
  }
}

function validateAffectiveData(data: any, path: string, errors: ValidationError[], warnings: ValidationWarning[]) {
  const { stress, calm, focus, mask, dominant } = data;

  if (typeof stress === 'number' && (stress < 0 || stress > 1)) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.stress`, 'stress must be in range [0, 1]', String(stress)));
  }

  if (typeof calm === 'number' && (calm < 0 || calm > 1)) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.calm`, 'calm must be in range [0, 1]', String(calm)));
  }

  if (typeof focus === 'number' && (focus < 0 || focus > 1)) {
    errors.push(createError(E_INVALID_RANGE, `${path}.data.focus`, 'focus must be in range [0, 1]', String(focus)));
  }

  if (mask && typeof mask === 'object') {
    for (const key of REQUIRED_MASK_KEYS) {
      if (!(key in mask)) {
        errors.push(createError(
          E_MASK_KEYS,
          `${path}.data.mask.${key}`,
          `Mask must contain all required keys: ${REQUIRED_MASK_KEYS.join(', ')}`,
          `Missing: ${key}`
        ));
      } else {
        const value = mask[key];
        if (typeof value !== 'number' || value < 0 || value > 1) {
          errors.push(createError(
            E_INVALID_RANGE,
            `${path}.data.mask.${key}`,
            'Mask values must be in range [0, 1]',
            String(value)
          ));
        }
      }
    }

    if (dominant === 'calm' && mask.isOverwhelmed && mask.isOverwhelmed > 0.5) {
      warnings.push(createWarning(
        W_EMOTION_INCONSISTENT,
        `${path}.data`,
        'dominant="calm" but mask.isOverwhelmed > 0.5',
        `isOverwhelmed: ${mask.isOverwhelmed}`
      ));
    }
  }
}

function validateView(view: any, path: string, errors: ValidationError[], warnings: ValidationWarning[]) {
  if (!view || typeof view !== 'object') {
    return;
  }

  const { theme, color, pattern, radius } = view;

  if (theme && typeof theme !== 'string') {
    errors.push(createError(E_INVALID_ENUM, `${path}.view.theme`, 'theme must be a string'));
  }

  if (color) {
    if (!HEX_COLOR_PATTERN.test(color)) {
      errors.push(createError(
        E_INVALID_COLOR,
        `${path}.view.color`,
        'Color must be a valid hex color (#RRGGBB or #RGB)',
        color
      ));
    }
  }

  const validPatterns = ['wave_expansion', 'pulse_radiation', 'node_color_shift', 'custom'];
  if (pattern && !validPatterns.includes(pattern)) {
    errors.push(createError(
      E_INVALID_ENUM,
      `${path}.view.pattern`,
      `pattern must be one of: ${validPatterns.join(', ')}`,
      String(pattern)
    ));
  }

  if (typeof radius === 'number' && radius < 0) {
    errors.push(createError(E_INVALID_RANGE, `${path}.view.radius`, 'radius must be ≥ 0', String(radius)));
  }

  if (view.pulse_origin) {
    const { x, y, z } = view.pulse_origin;
    if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
      errors.push(createError(
        E_MISSING_FIELD,
        `${path}.view.pulse_origin`,
        'pulse_origin x, y, z must be numbers'
      ));
    }
  }
}

function validateLinkFunction(func: any, path: string, errors: ValidationError[]) {
  if (!func || typeof func !== 'object') {
    return;
  }

  const { type, params } = func;
  const validTypes = ['gain', 'sigmoid', 'exp_decay', 'bandpass_mod', 'threshold_gate'];

  if (!validTypes.includes(type)) {
    errors.push(createError(
      E_INVALID_ENUM,
      `${path}.function.type`,
      `function.type must be one of: ${validTypes.join(', ')}`,
      String(type)
    ));
    return;
  }

  if (!params || typeof params !== 'object') {
    errors.push(createError(E_MISSING_FIELD, `${path}.function.params`, 'function.params is required'));
    return;
  }

  switch (type) {
    case 'gain':
      if (typeof params.k !== 'number' || params.k < 0) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params.k`,
          'gain.k must be ≥ 0',
          String(params.k)
        ));
      }
      break;

    case 'sigmoid':
      if (typeof params.a !== 'number' || params.a <= 0) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params.a`,
          'sigmoid.a must be > 0',
          String(params.a)
        ));
      }
      if (typeof params.b !== 'number' || params.b < 0 || params.b > 1) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params.b`,
          'sigmoid.b must be in range [0, 1]',
          String(params.b)
        ));
      }
      break;

    case 'exp_decay':
      if (typeof params.tau !== 'number' || params.tau <= 0) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params.tau`,
          'exp_decay.tau must be > 0',
          String(params.tau)
        ));
      }
      break;

    case 'bandpass_mod':
      if (typeof params.f_low !== 'number' || params.f_low <= 0) {
        errors.push(createError(E_FUNC_PARAMS, `${path}.function.params.f_low`, 'f_low must be > 0', String(params.f_low)));
      }
      if (typeof params.f_high !== 'number' || params.f_high <= 0) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params.f_high`,
          'f_high must be > 0',
          String(params.f_high)
        ));
      }
      if (typeof params.f_low === 'number' && typeof params.f_high === 'number' && params.f_high <= params.f_low) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params`,
          'f_high must be > f_low',
          `f_low: ${params.f_low}, f_high: ${params.f_high}`
        ));
      }
      if (typeof params.q !== 'number' || params.q <= 0) {
        errors.push(createError(E_FUNC_PARAMS, `${path}.function.params.q`, 'q must be > 0', String(params.q)));
      }
      break;

    case 'threshold_gate':
      if (typeof params.th_on !== 'number' || typeof params.th_off !== 'number') {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params`,
          'th_on and th_off must be numbers'
        ));
      } else if (params.th_on < params.th_off) {
        errors.push(createError(
          E_FUNC_PARAMS,
          `${path}.function.params`,
          'th_on must be ≥ th_off',
          `th_on: ${params.th_on}, th_off: ${params.th_off}`
        ));
      }
      break;
  }
}

export function validateBiometricFlow(flowData: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  if (!flowData || typeof flowData !== 'object') {
    errors.push(createError(E_MISSING_FIELD, 'flow', 'Flow data is required'));
    return { valid: false, errors, warnings };
  }

  const flow = flowData.flow;
  if (!flow || typeof flow !== 'object') {
    errors.push(createError(E_MISSING_FIELD, 'flow', 'flow object is required'));
    return { valid: false, errors, warnings };
  }

  // Root flow validation
  if (!flow.id || typeof flow.id !== 'string') {
    errors.push(createError(E_MISSING_FIELD, 'flow.id', 'id must be a non-empty string'));
  }

  validateSchemaVersion(flow.schema_version, errors);
  validateSource(flow.source, errors);

  if (flow.source !== 'sim' && (!flow.consent_id || flow.consent_id === '')) {
    errors.push(createError(
      E_CONSENT_MISSING,
      'flow.consent_id',
      'consent_id is required when source is not "sim"'
    ));
  }

  validateTimeFields(flow, errors);
  validateSamplingHz(flow.sampling_hz, errors, warnings);

  const start_ts = flow.start_ts || 0;
  const end_ts = flow.end_ts || 0;

  // Layers validation
  if (!Array.isArray(flow.layers)) {
    errors.push(createError(E_MISSING_FIELD, 'flow.layers', 'layers must be an array'));
  } else {
    const layerIds = new Set<string>();
    flow.layers.forEach((layer: any, index: number) => {
      const layerPath = `flow.layers[${index}]`;

      if (!layer || typeof layer !== 'object') {
        errors.push(createError(E_MISSING_FIELD, layerPath, 'Layer must be an object'));
        return;
      }

      validateLayerId(layer.id, layerIds, index, errors);
      validateLayerType(layer.type, index, errors);

      if (typeof layer.active !== 'boolean') {
        errors.push(createError(E_MISSING_FIELD, `${layerPath}.active`, 'active must be a boolean'));
      }

      if (layer.data && typeof layer.data === 'object') {
        if (!layer.data.units) {
          errors.push(createError(E_MISSING_FIELD, `${layerPath}.data.units`, 'units is required'));
        }

        validateConfidence(layer.data.confidence, layerPath, errors);
      }

      validateSignalQuality(layer.signal_quality, layerPath, errors, warnings);

      if (layer.view) {
        validateView(layer.view, layerPath, errors, warnings);
      }

      // Type-specific validation
      if (layer.type === 'respiratory') {
        validateRespiratoryData(layer.data, layerPath, start_ts, end_ts, errors);
      } else if (layer.type === 'cardiovascular') {
        validateCardiovascularData(layer.data, layerPath, flow.sampling_hz, errors, warnings);
      } else if (layer.type === 'affective') {
        validateAffectiveData(layer.data, layerPath, errors, warnings);
      }
    });
  }

  // Links validation
  if (!Array.isArray(flow.links)) {
    errors.push(createError(E_MISSING_FIELD, 'flow.links', 'links must be an array'));
  } else {
    const layerIds = new Set(flow.layers?.map((l: any) => l.id) || []);
    flow.links.forEach((link: any, index: number) => {
      const linkPath = `flow.links[${index}]`;

      if (!link || typeof link !== 'object') {
        errors.push(createError(E_MISSING_FIELD, linkPath, 'Link must be an object'));
        return;
      }

      if (!layerIds.has(link.source)) {
        errors.push(createError(
          E_LINK_REF,
          `${linkPath}.source`,
          'Layer reference not found',
          link.source
        ));
      }

      if (!layerIds.has(link.target)) {
        errors.push(createError(
          E_LINK_REF,
          `${linkPath}.target`,
          'Layer reference not found',
          link.target
        ));
      }

      if (link.source === link.target) {
        errors.push(createError(
          E_LINK_REF,
          linkPath,
          'source and target must be different',
          `${link.source} → ${link.target}`
        ));
      }

      if (typeof link.strength === 'number' && (link.strength < 0 || link.strength > 1)) {
        errors.push(createError(
          E_INVALID_RANGE,
          `${linkPath}.strength`,
          'strength must be in range [0, 1]',
          String(link.strength)
        ));
      }

      if (typeof link.lag_ms === 'number' && link.lag_ms < 0) {
        errors.push(createError(E_INVALID_RANGE, `${linkPath}.lag_ms`, 'lag_ms must be ≥ 0', String(link.lag_ms)));
      }

      if (link.function) {
        validateLinkFunction(link.function, linkPath, errors);
      }
    });
  }

  // Network impact validation
  if (flow.network_impact && typeof flow.network_impact === 'object') {
    const ni = flow.network_impact;
    const niPath = 'flow.network_impact';

    if (typeof ni.total_pulses === 'number' && ni.total_pulses < 0) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${niPath}.total_pulses`,
        'total_pulses must be ≥ 0',
        String(ni.total_pulses)
      ));
    }

    if (typeof ni.activated_nodes_estimate === 'number' && ni.activated_nodes_estimate < 0) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${niPath}.activated_nodes_estimate`,
        'activated_nodes_estimate must be ≥ 0',
        String(ni.activated_nodes_estimate)
      ));
    }

    const validEnergyFlows = ['unidirectional', 'bidirectional', 'cyclic'];
    if (ni.energy_flow && !validEnergyFlows.includes(ni.energy_flow)) {
      errors.push(createError(
        E_INVALID_ENUM,
        `${niPath}.energy_flow`,
        `energy_flow must be one of: ${validEnergyFlows.join(', ')}`,
        String(ni.energy_flow)
      ));
    }

    if (typeof ni.coherence === 'number' && (ni.coherence < 0 || ni.coherence > 1)) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${niPath}.coherence`,
        'coherence must be in range [0, 1]',
        String(ni.coherence)
      ));
    }

    const validCoherenceMethods = ['PLV', 'xCorr', 'custom'];
    if (ni.coherence_method && !validCoherenceMethods.includes(ni.coherence_method)) {
      errors.push(createError(
        E_INVALID_ENUM,
        `${niPath}.coherence_method`,
        `coherence_method must be one of: ${validCoherenceMethods.join(', ')}`,
        String(ni.coherence_method)
      ));
    }

    if (typeof ni.window_ms === 'number' && ni.window_ms < 100) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${niPath}.window_ms`,
        'window_ms must be ≥ 100',
        String(ni.window_ms)
      ));
    }

    if (typeof ni.latency_budget_ms === 'number' && ni.latency_budget_ms < 1) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${niPath}.latency_budget_ms`,
        'latency_budget_ms must be ≥ 1',
        String(ni.latency_budget_ms)
      ));
    }

    if (typeof ni.dropped_frames === 'number' && ni.dropped_frames < 0) {
      errors.push(createError(
        E_INVALID_RANGE,
        `${niPath}.dropped_frames`,
        'dropped_frames must be ≥ 0',
        String(ni.dropped_frames)
      ));
    }

    const validResampleStrategies = ['linear', 'zero_order', 'lanczos'];
    if (ni.resample_strategy && !validResampleStrategies.includes(ni.resample_strategy)) {
      errors.push(createError(
        E_INVALID_ENUM,
        `${niPath}.resample_strategy`,
        `resample_strategy must be one of: ${validResampleStrategies.join(', ')}`,
        String(ni.resample_strategy)
      ));
    }
  }

  // Cross-field checks
  if (flow.layers && Array.isArray(flow.layers)) {
    for (const layer of flow.layers) {
      if (layer.type === 'cardiovascular' && layer.data?.rr_ms && Array.isArray(layer.data.rr_ms)) {
        if (flow.sampling_hz?.heart && flow.sampling_hz.heart < 100) {
          warnings.push(createWarning(
            W_HRV_SAMPLING_LOW,
            'flow.sampling_hz.heart',
            'HRV metrics require sampling_hz.heart ≥ 100',
            `Current: ${flow.sampling_hz.heart}`
          ));
        }
      }

      if (layer.data?.phase_ts) {
        const phase_ts = layer.data.phase_ts;
        if (typeof phase_ts === 'number' && (phase_ts < start_ts || phase_ts > end_ts)) {
          errors.push(createError(
            E_INVALID_RANGE,
            `flow.layers[${flow.layers.indexOf(layer)}].data.phase_ts`,
            `phase_ts must be in range [${start_ts}, ${end_ts}]`,
            String(phase_ts)
          ));
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

