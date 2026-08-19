// audio setup
const keyStrokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];//Math.random() generates 0 to 1 and Math.floor() rounds DOWN to nearest whole no

    randomSound.currentTime = 0; // this is for a better UX, def add this
    randomSound.play().catch((error) => console.log("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound  };
}

export default useKeyboardSound;
