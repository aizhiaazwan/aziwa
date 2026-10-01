import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";

import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
  type Course,
} from "../../service/courses";

export default function MataKuliahScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [credits, setCredits] = useState("");

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Gagal mengambil mata kuliah:", error);

      Alert.alert("Gagal", "Mata kuliah tidak dapat dimuat.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [loadCourses]),
  );

  const resetForm = () => {
    setName("");
    setCode("");
    setLecturer("");
    setCredits("");
    setEditingCourse(null);
  };

  const openAddModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setName(course.name);
    setCode(course.code ?? "");
    setLecturer(course.lecturer ?? "");
    setCredits(course.credits !== null ? String(course.credits) : "");

    setModalVisible(true);
  };

  const closeModal = () => {
    if (saving) {
      return;
    }

    setModalVisible(false);
    resetForm();
  };

  const handleSave = async () => {
    // Validasi nama
    if (!name.trim()) {
      Alert.alert("Data belum lengkap", "Nama mata kuliah wajib diisi.");
      return;
    }

    // Konversi SKS
    let creditsNumber: number | undefined;

    if (credits.trim()) {
      const parsedCredits = Number(credits.trim());

      if (!Number.isInteger(parsedCredits) || parsedCredits < 1) {
        Alert.alert("SKS tidak valid", "SKS harus berupa angka minimal 1.");
        return;
      }

      creditsNumber = parsedCredits;
    }

    try {
      setSaving(true);

      if (editingCourse) {
        await updateCourse(editingCourse.id, {
          name: name.trim(),
          code: code.trim() || undefined,
          lecturer: lecturer.trim() || undefined,
          credits: creditsNumber,
        });
      } else {
        await createCourse({
          name: name.trim(),
          code: code.trim() || undefined,
          lecturer: lecturer.trim() || undefined,
          credits: creditsNumber,
        });
      }

      setModalVisible(false);
      resetForm();

      await loadCourses();
    } catch (error) {
      console.error("Gagal menyimpan mata kuliah:", error);

      Alert.alert("Gagal", "Mata kuliah tidak dapat disimpan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (course: Course) => {
    Alert.alert("Hapus Mata Kuliah", `Hapus "${course.name}"?`, [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteCourse(course.id);
            await loadCourses();
          } catch (error) {
            console.error("Gagal menghapus mata kuliah:", error);

            Alert.alert("Gagal", "Mata kuliah tidak dapat dihapus.");
          }
        },
      },
    ]);
  };

  const renderCourse = ({ item }: { item: Course }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View
            style={[
              styles.colorIndicator,
              {
                backgroundColor: item.color ?? "#6C3BFF",
              },
            ]}
          />

          <View style={styles.courseInfo}>
            <Text style={styles.courseName}>{item.name}</Text>

            {item.code ? (
              <Text style={styles.secondaryText}>{item.code}</Text>
            ) : null}

            {item.lecturer ? (
              <Text style={styles.secondaryText}>{item.lecturer}</Text>
            ) : null}

            {item.credits !== null ? (
              <Text style={styles.credits}>{item.credits} SKS</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => openEditModal(item)}
            style={styles.editButton}
          >
            <Text style={styles.editText}>Edit</Text>
          </Pressable>

          <Pressable
            onPress={() => handleDelete(item)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Hapus</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Akademik</Text>

          <Text style={styles.title}>Mata Kuliah</Text>

          <Text style={styles.subtitle}>Kelola mata kuliah kamu</Text>
        </View>

        <Pressable onPress={openAddModal} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6C3BFF" />

          <Text style={styles.loadingText}>Memuat mata kuliah...</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourse}
          contentContainerStyle={
            courses.length === 0 ? styles.emptyContainer : styles.list
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>Belum ada mata kuliah</Text>

              <Text style={styles.emptyText}>
                Tambahkan mata kuliah pertama kamu dengan tombol +.
              </Text>

              <Pressable onPress={openAddModal} style={styles.emptyButton}>
                <Text style={styles.emptyButtonText}>Tambah Mata Kuliah</Text>
              </Pressable>
            </View>
          }
        />
      )}

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {editingCourse ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
            </Text>

            {/* NAMA */}
            <Text style={styles.label}>Nama Mata Kuliah *</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Contoh: Web Programming"
              placeholderTextColor="#999999"
              style={styles.input}
            />

            {/* KODE */}
            <Text style={styles.label}>Kode Mata Kuliah</Text>

            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="Contoh: IF401"
              placeholderTextColor="#999999"
              style={styles.input}
            />

            {/* DOSEN */}
            <Text style={styles.label}>Dosen</Text>

            <TextInput
              value={lecturer}
              onChangeText={setLecturer}
              placeholder="Nama dosen"
              placeholderTextColor="#999999"
              style={styles.input}
            />

            {/* SKS */}
            <Text style={styles.label}>SKS</Text>

            <TextInput
              value={credits}
              onChangeText={setCredits}
              placeholder="Contoh: 3"
              placeholderTextColor="#999999"
              keyboardType="number-pad"
              style={styles.input}
            />

            {/* BUTTON */}
            <View style={styles.modalActions}>
              <Pressable
                onPress={closeModal}
                disabled={saving}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Batal</Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                disabled={saving}
                style={styles.saveButton}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.saveText}>Simpan</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eyebrow: {
    fontSize: 13,
    color: "#777777",
    marginBottom: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#171717",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#777777",
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6C3BFF",
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 32,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  cardContent: {
    flexDirection: "row",
  },

  colorIndicator: {
    width: 6,
    borderRadius: 4,
    marginRight: 12,
  },

  courseInfo: {
    flex: 1,
  },

  courseName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },

  secondaryText: {
    fontSize: 13,
    color: "#777777",
    marginTop: 2,
  },

  credits: {
    fontSize: 13,
    color: "#6C3BFF",
    fontWeight: "600",
    marginTop: 6,
  },

  actions: {
    flexDirection: "row",
    marginTop: 14,
  },

  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F0EBFF",
    marginRight: 8,
  },

  editText: {
    color: "#6C3BFF",
    fontWeight: "600",
  },

  deleteButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#FFF0F0",
  },

  deleteText: {
    color: "#D33B3B",
    fontWeight: "600",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#777777",
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  empty: {
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 20,
  },

  emptyButton: {
    backgroundColor: "#6C3BFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 30,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 6,
    marginTop: 8,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#171717",
    backgroundColor: "#FFFFFF",
  },

  modalActions: {
    flexDirection: "row",
    marginTop: 22,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  cancelText: {
    color: "#555555",
    fontWeight: "600",
  },

  saveButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#6C3BFF",
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
