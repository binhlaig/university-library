interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  isLoanedBook: boolean;
  summary: string;
  createdAt: Date | null;
}
interface AuthCredentials {
  fullname: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}
