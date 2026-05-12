import { PrismaClient, Role, TeachingMode } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Seed Subjects ───────────────────────────────────────────────────────
  const subjectNames = [
    "10th CBSE Mathematics",
    "10th CBSE Science",
    "10th CBSE English",
    "10th State Mathematics",
    "10th State Science",
    "12th CBSE Physics",
    "12th CBSE Chemistry",
    "12th CBSE Mathematics",
    "12th State Physics",
    "12th State Chemistry",
    "12th State Mathematics",
    "8th CBSE Mathematics",
    "8th CBSE Science",
    "8th CBSE English",
    "JEE Mains Mathematics",
    "JEE Mains Physics",
    "NEET Biology",
    "NEET Chemistry",
    "Computer Science (Python)",
    "Computer Science (C++)",
  ];

  const subjects = await Promise.all(
    subjectNames.map((name) =>
      prisma.subject.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log(`✅ Seeded ${subjects.length} subjects`);

  // ─── Seed Tutor Users & Profiles ─────────────────────────────────────────
  const tutors = [
    {
      name: "Arjun Menon",
      email: "arjun.menon@cusat.ac.in",
      phone: "9847123456",
      degree: "B.Tech Information Technology",
      yearOfStudy: 3,
      bio: "Passionate about making Math simple and fun! I've been tutoring students in my neighborhood in Kalamassery for the past 2 years.",
      teachingMode: TeachingMode.BOTH,
      isVerified: true,
      subjectNames: ["10th CBSE Mathematics", "12th CBSE Mathematics", "JEE Mains Mathematics"],
    },
    {
      name: "Sneha Krishnan",
      email: "sneha.k@cusat.ac.in",
      phone: "9562234567",
      degree: "B.Tech Information Technology",
      yearOfStudy: 4,
      bio: "Final year B.Tech IT student with a strong grasp on Physics. I teach at homes around Edappally and Kakkanad.",
      teachingMode: TeachingMode.OFFLINE,
      isVerified: true,
      subjectNames: ["12th CBSE Physics", "12th State Physics", "JEE Mains Physics"],
    },
    {
      name: "Amal Thomas",
      email: "amal.t@cusat.ac.in",
      phone: "8907345678",
      degree: "B.Tech Information Technology",
      yearOfStudy: 2,
      bio: "Second year IT student who loves teaching younger students! I focus on 8th and 10th standard CBSE Science and Math.",
      teachingMode: TeachingMode.BOTH,
      isVerified: false,
      subjectNames: ["10th CBSE Mathematics", "10th CBSE Science", "8th CBSE Mathematics", "8th CBSE Science"],
    },
    {
      name: "Devika Nair",
      email: "devika.nair@cusat.ac.in",
      phone: "7012456789",
      degree: "M.Sc Mathematics",
      yearOfStudy: 1,
      bio: "Gold medalist in B.Sc Mathematics from MG University. I specialize in higher-level mathematics including JEE preparation.",
      teachingMode: TeachingMode.ONLINE,
      isVerified: true,
      subjectNames: ["12th CBSE Mathematics", "12th State Mathematics", "JEE Mains Mathematics"],
    },
    {
      name: "Rahul Sharma",
      email: "rahul.s@cusat.ac.in",
      phone: "9446567890",
      degree: "B.Tech Information Technology",
      yearOfStudy: 3,
      bio: "Experienced in teaching Chemistry and Biology for NEET aspirants. Available in Palarivattom and Vyttila areas.",
      teachingMode: TeachingMode.OFFLINE,
      isVerified: true,
      subjectNames: ["12th CBSE Chemistry", "12th State Chemistry", "NEET Biology", "NEET Chemistry"],
    },
    {
      name: "Fathima Zahra",
      email: "fathima.z@cusat.ac.in",
      phone: "8086678901",
      degree: "B.Sc Physics",
      yearOfStudy: 3,
      bio: "Physics enthusiast who loves conducting experiments at home to explain concepts. Available in Fort Kochi and Mattancherry.",
      teachingMode: TeachingMode.BOTH,
      isVerified: false,
      subjectNames: ["10th State Science", "12th State Physics", "10th CBSE Science"],
    },
    {
      name: "Vishnu Prasad",
      email: "vishnu.p@cusat.ac.in",
      phone: "9037789012",
      degree: "B.Tech Information Technology",
      yearOfStudy: 4,
      bio: "Coding and Mathematics go hand in hand! I teach Computer Science along with 10th and 12th Math in Ernakulam South.",
      teachingMode: TeachingMode.BOTH,
      isVerified: true,
      subjectNames: ["10th CBSE Mathematics", "10th State Mathematics", "Computer Science (Python)", "Computer Science (C++)"],
    },
    {
      name: "Lakshmi Priya",
      email: "lakshmi.p@cusat.ac.in",
      phone: "9188890123",
      degree: "B.Tech Information Technology",
      yearOfStudy: 2,
      bio: "Enthusiastic English and Science tutor for middle school students. Available in Tripunithura and Maradu areas.",
      teachingMode: TeachingMode.OFFLINE,
      isVerified: false,
      subjectNames: ["10th CBSE English", "8th CBSE Science", "8th CBSE English"],
    },
  ];

  for (const tutor of tutors) {
    const user = await prisma.user.upsert({
      where: { email: tutor.email },
      update: {},
      create: {
        name: tutor.name,
        email: tutor.email,
        role: Role.TUTOR,
      },
    });

    const profile = await prisma.tutorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        phone: tutor.phone,
        collegeName: "CUSAT - Cochin University of Science and Technology",
        degree: tutor.degree,
        yearOfStudy: tutor.yearOfStudy,
        bio: tutor.bio,
        teachingMode: tutor.teachingMode,
        isVerified: tutor.isVerified,
      },
    });

    // Link subjects
    const subjectRecords = await prisma.subject.findMany({
      where: { name: { in: tutor.subjectNames } },
    });

    for (const subject of subjectRecords) {
      await prisma.tutorSubject.upsert({
        where: {
          tutorProfileId_subjectId: {
            tutorProfileId: profile.id,
            subjectId: subject.id,
          },
        },
        update: {},
        create: {
          tutorProfileId: profile.id,
          subjectId: subject.id,
        },
      });
    }

    console.log(`  ✅ ${tutor.name} — ${tutor.subjectNames.length} subjects`);
  }

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
