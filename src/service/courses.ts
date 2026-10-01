import { supabase } from "../lib/supabase";

export type Course = {
  id: string;
  user_id: string;
  name: string;
  code: string | null;
  lecturer: string | null;
  credits: number | null;
  color: string | null;
  created_at: string;
  updated_at: string;
};

export type CreateCourseInput = {
  name: string;
  code?: string;
  lecturer?: string;
  credits?: number;
  color?: string;
};

export async function getCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;

  return data as Course[];
}

export async function createCourse(input: CreateCourseInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User belum login");
  }

  const { data, error } = await supabase
    .from("courses")
    .insert({
      user_id: user.id,
      name: input.name,
      code: input.code || null,
      lecturer: input.lecturer || null,
      credits: input.credits ?? null,
      color: input.color || "#6C3BFF",
    })
    .select()
    .single();

  if (error) throw error;

  return data as Course;
}

export async function updateCourse(
  id: string,
  input: Partial<CreateCourseInput>,
) {
  const { data, error } = await supabase
    .from("courses")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Course;
}

export async function deleteCourse(id: string) {
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) throw error;
}
