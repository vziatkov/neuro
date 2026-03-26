export interface Choice {
  text: string;
  nextSceneId: string;
}

export interface Scene {
  id: string;
  text: string;
  image: string;
  choices: Choice[];
}

export const story: Record<string, Scene> = {
  start: {
    id: "start",
    text: "The neon lights of CASINO-OBOZ flicker against the damp pavement. A vintage Volga taxi idles nearby, its driver watching you with a knowing smirk. 'You're late,' he says, his voice like gravel. 'The system is already waiting for you.'",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Get in the taxi", nextSceneId: "taxi_ride" },
      { text: "Walk into the casino", nextSceneId: "casino_entrance" }
    ]
  },
  taxi_ride: {
    id: "taxi_ride",
    text: "The interior smells of old leather and cheap tobacco. The driver pulls away without a word. You see the city blurring past—a maze of shadows and electric blue. 'You think you're just a passenger?' he asks. 'In this city, everyone is a component.'",
    image: "https://images.unsplash.com/photo-1493238792040-81564986c05c?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Ask about the system", nextSceneId: "system_reveal" },
      { text: "Stay silent", nextSceneId: "silent_ride" }
    ]
  },
  casino_entrance: {
    id: "casino_entrance",
    text: "The lobby is a cathedral of gold and marble. A yellow taxi sits incongruously in the center, polished to a mirror shine. The air is thick with the scent of perfume and desperation. A screen nearby flashes: ТЫ УЖЕ ВНУТРИ СИСТЕМЫ.",
    image: "https://images.unsplash.com/photo-1596838132731-dd964551f1f0?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Approach the screen", nextSceneId: "system_reveal" },
      { text: "Look for a contact", nextSceneId: "contact_search" }
    ]
  },
  system_reveal: {
    id: "system_reveal",
    text: "The screen pulses with a rhythmic glow. Data streams cascade like digital rain. You realize the casino isn't just a building—it's a node. The city isn't a place—it's a program. And you? You're the variable that shouldn't exist.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Try to hack the node", nextSceneId: "hack_attempt" },
      { text: "Accept your role", nextSceneId: "acceptance" }
    ]
  },
  silent_ride: {
    id: "silent_ride",
    text: "The silence is heavy. The driver stops in a dark alley. 'End of the line,' he says. He hands you a small, glowing chip. 'Don't lose it. It's your only way out of the loop.'",
    image: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Take the chip", nextSceneId: "chip_taken" },
      { text: "Refuse it", nextSceneId: "refusal" }
    ]
  },
  contact_search: {
    id: "contact_search",
    text: "You scan the crowd. Everyone looks like a ghost. A woman in a red coat catches your eye. She nods toward a back door. 'The variable,' she whispers as you pass. 'The system is looking for you.'",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Follow her", nextSceneId: "follow_woman" },
      { text: "Head for the exit", nextSceneId: "escape_attempt" }
    ]
  },
  hack_attempt: {
    id: "hack_attempt",
    text: "Your fingers dance across the interface. The system screams in binary. For a second, the veil lifts. You see the truth: the city is a simulation designed to harvest luck. But you've just introduced a virus.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Restart the loop", nextSceneId: "start" }
    ]
  },
  acceptance: {
    id: "acceptance",
    text: "You step into the light. The noise of the casino fades into a digital hum. You are part of the system now. The variable has been resolved. The house always wins.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Restart the loop", nextSceneId: "start" }
    ]
  },
  chip_taken: {
    id: "chip_taken",
    text: "The chip feels warm in your hand. As you step out of the taxi, the world glitches. You see the code behind the brick walls. You have the key. Now, you just need to find the lock.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Restart the loop", nextSceneId: "start" }
    ]
  },
  refusal: {
    id: "refusal",
    text: "You walk away. The taxi vanishes into the fog. The city feels colder, more rigid. You realize too late that without the key, you're just another line of code waiting to be deleted.",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Restart the loop", nextSceneId: "start" }
    ]
  },
  follow_woman: {
    id: "follow_woman",
    text: "She leads you to a room filled with servers. 'We are the resistance,' she says. 'The ones who remember the world before the casino took over.' She hands you a terminal. 'It's time to crash the system.'",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Restart the loop", nextSceneId: "start" }
    ]
  },
  escape_attempt: {
    id: "escape_attempt",
    text: "You run for the doors, but they won't open. The walls begin to pixelate. A voice echoes through the lobby: 'Access denied. Variable out of bounds.' The floor drops away into a void of pure data.",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=1000",
    choices: [
      { text: "Restart the loop", nextSceneId: "start" }
    ]
  }
};
