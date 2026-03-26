/** Local lobby / narrative art — bundled by Vite with hashed URLs in dist. */
import img0 from '../assets/ChatGPT Image Mar 25, 2026, 09_57_18 AM.png?url';
import img1 from '../assets/ChatGPT Image Mar 26, 2026, 12_23_23 AM.png?url';
import img2 from '../assets/ChatGPT Image Mar 26, 2026, 12_26_34 AM.png?url';
import img3 from '../assets/ChatGPT Image Mar 26, 2026, 12_29_12 AM.png?url';
import img4 from '../assets/Gemini_Generated_Image_abv7bpabv7bpabv7.png?url';
import img5 from '../assets/Gemini_Generated_Image_lw4sbplw4sbplw4s.png?url';
import img6 from '../assets/Gemini_Generated_Image_rv95qbrv95qbrv95.png?url';

const pool = [img0, img1, img2, img3, img4, img5, img6];

export function sceneImage(index: number): string {
  return pool[index % pool.length];
}
