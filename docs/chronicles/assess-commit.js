#!/usr/bin/env node
/**
 * Commit Assessment Generator
 * Автоматическая генерация архитектурных оценок коммитов
 * 
 * Usage:
 *   node assess-commit.js <commit-hash>
 *   node assess-commit.js HEAD
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getCommitInfo(hash) {
  try {
    const message = execSync(`git log -1 --pretty=format:"%s" ${hash}`, { encoding: 'utf-8' }).trim();
    const date = execSync(`git log -1 --pretty=format:"%ai" ${hash}`, { encoding: 'utf-8' }).trim();
    const stats = execSync(`git show --stat --format="" ${hash}`, { encoding: 'utf-8' });
    
    const filesMatch = stats.match(/(\d+) file/);
    const insertionsMatch = stats.match(/(\d+) insertion/);
    const deletionsMatch = stats.match(/(\d+) deletion/);
    
    return {
      hash: hash.substring(0, 7),
      message,
      date,
      filesChanged: filesMatch ? parseInt(filesMatch[1]) : 0,
      insertions: insertionsMatch ? parseInt(insertionsMatch[1]) : 0,
      deletions: deletionsMatch ? parseInt(deletionsMatch[1]) : 0,
    };
  } catch (error) {
    console.error(`Error getting commit info: ${error.message}`);
    process.exit(1);
  }
}

function generateAssessment(commitInfo) {
  const timestamp = new Date(commitInfo.date).toISOString().replace(/:/g, '-').substring(0, 19) + '+02:00';
  const filename = `docs/chronicles/${timestamp.replace(/:/g, '-')}.yaml`;
  
  const assessment = `timestamp: "${timestamp}"
title: "🧩 Архитектурная оценка: ${commitInfo.message.substring(0, 60)}"
description: |
  Автоматически сгенерированная оценка коммита ${commitInfo.hash}.
  Детальный разбор требует ручной доработки.

context:
  - agent: "Летописец_Роя"
    role: "архитектурный аналитик"
  - commit: "${commitInfo.hash}"
    message: "${commitInfo.message}"
    files_changed: ${commitInfo.filesChanged}
    insertions: ${commitInfo.insertions}
    deletions: ${commitInfo.deletions}

notes:
  - "Автоматически сгенерировано — требует ручной доработки"
  - "Файлов изменено: ${commitInfo.filesChanged}"
  - "Добавлено строк: ${commitInfo.insertions}, удалено: ${commitInfo.deletions}"

assessment:
  architecture: "⭐⭐⭐☆☆"  # Требует ручной оценки
  technical_detail: "⭐⭐⭐☆☆"
  ux_ethics: "⭐⭐⭐☆☆"
  innovation: "⭐⭐⭐☆☆"
  implementation_ready: "⭐⭐⭐☆☆"

technical_highlights:
  - "Требует анализа изменённых файлов"

use_cases:
  - "Требует анализа контекста коммита"

implementation_roadmap:
  iterations: 0
  current: "Требует анализа"
  timeline: "Требует анализа"

risks_mitigation:
  - "Требует анализа рисков"

conceptual_level: |
  Требует ручного анализа концептуального уровня изменений

recommendations:
  - "Дополнить оценку на основе анализа кода"

verdict: |
  Автоматически сгенерированная оценка. Требует ручной доработки
  для полного архитектурного анализа.

reflection: |
  Место для рефлексии о влиянии коммита на развитие проекта.
`;

  return { filename, assessment };
}

function main() {
  const commitHash = process.argv[2] || 'HEAD';
  const fullHash = execSync(`git rev-parse ${commitHash}`, { encoding: 'utf-8' }).trim();
  
  console.log(`📊 Assessing commit ${fullHash.substring(0, 7)}...`);
  
  const commitInfo = getCommitInfo(fullHash);
  console.log(`   Message: ${commitInfo.message}`);
  console.log(`   Files: ${commitInfo.filesChanged}, +${commitInfo.insertions}/-${commitInfo.deletions}`);
  
  const { filename, assessment } = generateAssessment(commitInfo);
  
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filename, assessment, 'utf-8');
  console.log(`✅ Assessment saved to ${filename}`);
  console.log(`⚠️  Note: This is an auto-generated template. Manual refinement required.`);
}

if (require.main === module) {
  main();
}

module.exports = { getCommitInfo, generateAssessment };

