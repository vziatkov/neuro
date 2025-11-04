import './style.css';
import * as THREE from 'three';
import { initApp } from './modules/app';
import './modules/logger/gptLogger'; // Initialize logger

// Boot
initApp(document.getElementById('app') as HTMLElement);
