import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tasks = [
  {
    subject: "WEB PROGRAMMING",
    title: "Membuat CRUD Laravel",
    date: "10 Sep 2026 • 23:59 WIB",
    status: "Pending",
    color: "#FF6B6B",
  },
  {
    subject: "MACHINE LEARNING",
    title: "Analisis Klasifikasi Random Forest",
    date: "04 Okt 2026 • 20:00 WIB",
    status: "Sedang",
    color: "#F4B740",
  },
  {
    subject: "METODE PENELITIAN",
    title: "Draft Bab 1-3 Proposal S",
    date: "05 Okt 2026 • 20:00 WIB",
    status: "In Progress",
    color: "#8B5CF6",
  },
];

export default function AppHomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandSmall}>Aziwa Academic</Text>
            <Text style={styles.brand}>Dashboard</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#5F5F5F"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Semester */}
        <View style={styles.semesterCard}>
          <View>
            <Text style={styles.semesterLabel}>Semester Ganjil 2026/2027</Text>
            <Text style={styles.semesterText}>Aktivitas Akademik</Text>
          </View>

          <View style={styles.semesterIcon}>
            <Ionicons name="refresh-outline" size={20} color="#6C3BFF" />
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Hai, Azhia 👋</Text>
          <Text style={styles.greetingSubtitle}>
            Berikut ringkasan aktivitas akademikmu hari ini.
          </Text>
        </View>

        {/* Focus card */}
        <TouchableOpacity style={styles.focusCard}>
          <View style={styles.focusIcon}>
            <Ionicons name="clipboard-outline" size={22} color="#FFFFFF" />
          </View>

          <View style={styles.focusContent}>
            <Text style={styles.focusLabel}>DEADLINE BESOK • 23:59 WIB</Text>
            <Text style={styles.focusTitle}>
              Web Programming - Membuat CRUD
            </Text>
            <Text style={styles.focusMeta}>CRUD Laravel</Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Task summary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ringkasan Tugas</Text>
          <Text style={styles.month}>Oktober 2026</Text>
        </View>

        <View style={styles.summaryRow}>
          <SummaryCard number="12" label="Total" />
          <SummaryCard number="4" label="Pending" />
          <SummaryCard number="5" label="Proses" />
          <SummaryCard number="3" label="Selesai" />
        </View>

        {/* Filter */}
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.activeFilter}>
            <Text style={styles.activeFilterText}>Semua</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filter}>
            <Text style={styles.filterText}>Hari Ini</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filter}>
            <Text style={styles.filterText}>Minggu Ini</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filter}>
            <Text style={styles.filterText}>Prioritas</Text>
          </TouchableOpacity>
        </View>

        {/* Deadline */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Deadline Terdekat</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Lihat Semua →</Text>
          </TouchableOpacity>
        </View>

        {tasks.map((task) => (
          <TaskCard key={task.title} {...task} />
        ))}

        {/* Productivity card */}
        <View style={styles.productivityCard}>
          <View style={styles.productivityIcon}>
            <Ionicons name="time-outline" size={22} color="#6C3BFF" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.productivityTitle}>
              Tetap Produktif 25 Menit
            </Text>
            <Text style={styles.productivitySubtitle}>
              Fokus tanpa gangguan dengan mode Pomodoro.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

function SummaryCard({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryNumber}>{number}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function TaskCard({
  subject,
  title,
  date,
  status,
  color,
}: {
  subject: string;
  title: string;
  date: string;
  status: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.taskCard}>
      <View style={[styles.taskDot, { backgroundColor: color }]} />

      <View style={styles.taskContent}>
        <Text style={styles.taskSubject}>{subject}</Text>
        <Text style={styles.taskTitle}>{title}</Text>

        <View style={styles.taskBottom}>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={13} color="#999999" />
            <Text style={styles.taskDate}>{date}</Text>
          </View>

          <View style={[styles.status, { backgroundColor: `${color}18` }]}>
            <Text style={[styles.statusText, { color }]}>{status}</Text>
          </View>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#B0B0B0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FF",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 52,
    paddingBottom: 100,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  brandSmall: {
    fontSize: 10,
    color: "#777777",
    fontWeight: "500",
  },

  brand: {
    fontSize: 21,
    color: "#252525",
    fontWeight: "800",
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEE8FF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#6C3BFF",
    fontSize: 15,
    fontWeight: "800",
  },

  semesterCard: {
    backgroundColor: "#EEE8FF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  semesterLabel: {
    color: "#6C3BFF",
    fontSize: 11,
    fontWeight: "700",
  },

  semesterText: {
    color: "#777777",
    fontSize: 10,
    marginTop: 3,
  },

  semesterIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  greeting: {
    marginBottom: 14,
  },

  greetingTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#292929",
  },

  greetingSubtitle: {
    marginTop: 4,
    color: "#8A8A8A",
    fontSize: 11,
  },

  focusCard: {
    backgroundColor: "#6337E8",
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  focusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  focusContent: {
    flex: 1,
  },

  focusLabel: {
    color: "#DCD1FF",
    fontSize: 8,
    fontWeight: "700",
  },

  focusTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },

  focusMeta: {
    color: "#DDD5FF",
    fontSize: 9,
    marginTop: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#292929",
  },

  month: {
    color: "#8A8A8A",
    fontSize: 10,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingVertical: 12,
    alignItems: "center",
  },

  summaryNumber: {
    color: "#6C3BFF",
    fontSize: 18,
    fontWeight: "800",
  },

  summaryLabel: {
    color: "#999999",
    fontSize: 9,
    marginTop: 2,
  },

  filterRow: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 20,
  },

  activeFilter: {
    backgroundColor: "#6C3BFF",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },

  filter: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  filterText: {
    color: "#777777",
    fontSize: 9,
  },

  seeAll: {
    color: "#6C3BFF",
    fontSize: 9,
    fontWeight: "700",
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  taskDot: {
    width: 4,
    height: 48,
    borderRadius: 4,
    marginRight: 11,
  },

  taskContent: {
    flex: 1,
  },

  taskSubject: {
    fontSize: 8,
    color: "#8A8A8A",
    fontWeight: "700",
  },

  taskTitle: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "700",
    marginTop: 3,
  },

  taskBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  taskDate: {
    fontSize: 8,
    color: "#999999",
  },

  status: {
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  statusText: {
    fontSize: 8,
    fontWeight: "700",
  },

  productivityCard: {
    marginTop: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  productivityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEE8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  productivityTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#333333",
  },

  productivitySubtitle: {
    fontSize: 8,
    color: "#999999",
    marginTop: 3,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 82,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6C3BFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});
