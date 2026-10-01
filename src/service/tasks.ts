import { supabase } from '../lib/supabase';

export type TaskStatus = "pending" | "in_progress" | "completed";

export type TaskPriority = "low" | "normal" | "high";

export type Task = {
  id: string;
  user_id: string;
  course_id: string | null;
  title: string;
  description: string | null;
  due_at: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  updated_at: string;
};

export type CreateTaskInput = {
  course_id?: string;
  title: string;
  description?: string;
  due_at?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
};

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data as Task[];
}

export async function createTask(input: CreateTaskInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: user.id,
      course_id: input.course_id ?? null,
      title: input.title,
      description: input.description ?? null,
      due_at: input.due_at ?? null,
      status: input.status ?? "pending",
      priority: input.priority ?? "normal",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Task;
}

export async function updateTask(id: string, input: Partial<CreateTaskInput>) {
  const { data, error } = await supabase
    .from("tasks")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
