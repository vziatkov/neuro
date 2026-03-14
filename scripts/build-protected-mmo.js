/**
 * Один HTML с inline-шифрованием. Не трогает mmo-map.html.
 * Вывод: mmo-map-protected.html (в корне) — работает без сервера и без fetch.
 *
 * node scripts/build-protected-mmo.js
 * MMO_ENCRYPT_KEY=secret node scripts/build-protected-mmo.js
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const srcHtml = path.join(rootDir, 'mmo-map.html');
const outHtml = path.join(rootDir, 'mmo-map-protected.html');

const PASSPHRASE = process.env.MMO_ENCRYPT_KEY || 'neuro-mmo-v1';

function extractInlineScript(html) {
  const end = html.lastIndexOf('</script>');
  if (end === -1) throw new Error('No </script> found');
  const lastScript = html.lastIndexOf('<script', end);
  if (lastScript === -1) throw new Error('No <script before </script>');
  if (html.slice(lastScript, lastScript + 8) !== '<script>') throw new Error('Inline <script> not found');
  return html.slice(lastScript + 8, end);
}

function encrypt(text, passphrase) {
  const key = crypto.createHash('sha256').update(passphrase, 'utf8').digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, enc, tag]);
}

function main() {
  if (!fs.existsSync(srcHtml)) {
    console.error('Not found:', srcHtml);
    process.exit(1);
  }

  const html = fs.readFileSync(srcHtml, 'utf8');
  const scriptContent = extractInlineScript(html);
  const encrypted = encrypt(scriptContent, PASSPHRASE);
  const encryptedB64 = encrypted.toString('base64');

  const passphraseB64 = Buffer.from(PASSPHRASE, 'utf8').toString('base64');

  const loader = `(function(){
var _b='${passphraseB64}';
var _p=new TextDecoder().decode(new Uint8Array([].map.call(atob(_b),function(c){return c.charCodeAt(0);})));
var _e="${encryptedB64.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}";
async function _r(){
var _buf=new Uint8Array([].map.call(atob(_e),function(c){return c.charCodeAt(0);}));
var _k=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(_p));
var _key=await crypto.subtle.importKey("raw",_k,{name:"AES-GCM"},false,["decrypt"]);
var _iv=_buf.buffer.slice(0,12);
var _d=_buf.buffer.slice(12);
var _dec=await crypto.subtle.decrypt({name:"AES-GCM",iv:_iv},_key,_d);
(new Function(new TextDecoder().decode(_dec)))();
}
_r().catch(function(e){console.error("Load failed",e);});
})();`;

  const end = html.lastIndexOf('</script>');
  const lastScript = html.lastIndexOf('<script', end);
  const closeTagEnd = end + '</script>'.length;
  const protectedHtml =
    html.slice(0, lastScript) + '<script>' + loader + '</script>' + html.slice(closeTagEnd);

  fs.writeFileSync(outHtml, protectedHtml);
  console.log('OK: mmo-map-protected.html');
}

main();
