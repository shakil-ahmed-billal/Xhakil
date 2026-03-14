export interface Resume {
  name: string
  file: string
}

export const RESUME_DATA: Record<string, Resume[]> = {
  Developer: [
    {
      name: "Backend Developer",
      file: "Shakil_Ahmed_Billal_Backend_Developer_resume.pdf",
    },
    {
      name: "Frontend Developer",
      file: "Shakil_Ahmed_Billal_Frontend_Developer_resume.pdf",
    },
    {
      name: "Full Stack Developer",
      file: "Shakil_Ahmed_Billal_Full_Stack_Developer_resume.pdf",
    },
    {
      name: "MERN Stack Developer",
      file: "Shakil_Ahmed_Billal_MERN_Stack_Developer_resume.pdf",
    },
  ],
  Engineer: [
    {
      name: "Backend Engineer",
      file: "Shakil_Ahmed_Billal_Backend_Engineer_resume.pdf",
    },
    {
      name: "Frontend Engineer",
      file: "Shakil_Ahmed_Billal_Frontend_Engineer_resume.pdf",
    },
    {
      name: "Full Stack Engineer",
      file: "Shakil_Ahmed_Billal_Full_stack_engineer_resume.pdf",
    },
    {
      name: "MERN Stack Engineer",
      file: "Shakil_Ahmed_Billal_MERN_Stack_Engineer_resume.pdf",
    },
    {
      name: "Software Engineer",
      file: "Shakil_Ahmed_Billal_Software_Engineer_resume.pdf",
    },
  ],
}
