import { Container } from "@mui/material";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
