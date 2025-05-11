import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  const hash = await bcrypt.hash('123456', 10);

  // 🔁 Truncar tabla y reiniciar IDs
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE Asistencias`);
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE Users`);
  await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1`);

  // 👨‍💻 Insertar usuarios admin/docente
  await prisma.users.createMany({
    data: [
      {
        name: 'Administrador',
        // apellidos: 'Sistema',
        username: 'admin',
        role: 'Administrador',
        password: hash,
        passwordText: '123456',
      },
      {
        name: 'Adimer Paul chambi Ajata',
        // apellidos: 'Chambi Ajata',
        username: 'adimer',
        role: 'Docente',
        password: hash,
        passwordText: '123456',
      },
    ],
  });

  // 👨‍🎓 Insertar estudiantes
  const estudiantes = [
    'AGUILAR MAMANI JAILER HUGO',
    'CARREÑO PAREDEZ FRANZ FELIPE',
    'CHAMBI CAMATA GROVER',
    'CHINCHE AGUILAR ISMAEL ENRIQUE',
    'CHINO SANCHEZ HERMOGENES',
    'CHOQUE COPA LAURA',
    'CHUNCHO POMA JOSE MANUEL',
    'CRUZ CRUZ CARLOS MARCELO',
    'FLORES APAZA EDITH ADRIANA',
    'FLORES QUINA FLORA',
    'GUEVARA LARREA PEDRO MARIO',
    'GUTIERREZ RAMIREZ ROGER ROLANDO',
    'HERRERA VARGAS MISHEL',
    'HINOJOSA CUEVAS ROGER SERGIO',
    'LOZANO HERRERA ARMANDO',
    'MAMANI GUTIERREZ MISAEL NEFI',
    'MAMANI YUCRA ALEXANDER',
    'POMA MENACHO FRANZ ANTONY',
    'RAMIREZ CHOQUE WILFREDO',
    'TOLA ESCOBAR JOSE',
    'TOLA MAMANI FRANCO',
    'TORREZ CRUZ JOSE MIGUEL',
    'URQUIZO BUTRON VICTOR ABEL',
    'USCAMAITA RAMOS CRISTIAN',
    'VELASCO ALVAREZ DANNY ALEJANDRO',
    'VIDAL QUIROZ ALEXIS ERLAN',
    'VIDAL RODRIGUEZ GUSTAVO ALEN',
  ];

  for (let i = 0; i < estudiantes.length; i++) {
    // const [apellidos, ...nombres] = estudiantes[i].split(' ');
    const username = `est${i + 1}`; // est1, est2, ...
    await prisma.users.create({
      data: {
        name: estudiantes[i],
        // apellidos: apellidos,
        username,
        role: 'Estudiante',
        password: hash,
        passwordText: '123456',
      },
    });
  }
}

main()
    .then(async () => {
      await prisma.$disconnect();
      console.log('✅ Usuarios insertados correctamente');
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
