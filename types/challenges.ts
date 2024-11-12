import ChallengesList from "@/components/ui/ChallengesList";

export interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  level: string;
  code: object;
  tests: ChallengeTest[];
  createdAt: string;
}

export interface ChallengeTest {
  id: string;
  text: string;
  username: string;
}
