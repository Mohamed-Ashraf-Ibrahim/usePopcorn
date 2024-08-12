import { useEffect } from "react";
export function useKey(key, action) {
  // Effect for implement the key press feature
  useEffect(() => {
    // Callback function to handle 'Escape' key press.
    function callBack(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    // Add event listener for "keydown" to trigger callBack function.
    document.addEventListener("keydown", callBack);
    // Cleanup function to remove the event listener when component unmounts or dependencies change.
    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [key, action]);
}
