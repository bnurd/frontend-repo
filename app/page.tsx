import Profile from "@/components/Profile";
import { Card, Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Card>
        <Profile />
      </Card>
    </Container>
  );
}
