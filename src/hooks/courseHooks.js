import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export function useCourseProgress() {
  const { user, setUser } = useAppContext();

  const saveProgress = async (step) => {
    if (step <= parseInt(user?.lessons_completed || 0)) return;

    try {
      const res = await api.patch("/users/progress", {
        lessonsCompleted: step,
      });

      if (res.data.success) {
        setUser((prev) => ({
          ...prev,
          lessons_completed: step,
          course_completed: res.data.completed,
        }));
      }
      return res.data;
    } catch (err) {
      console.error("Failed to save progress", err);
      return { success: false };
    }
  };

  return {
    lessonsCompleted: parseInt(user?.lessons_completed || 0),
    courseComplete: Boolean(user?.course_completed),
    saveProgress,
  };
}