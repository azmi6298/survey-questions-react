import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function CardComponent({ cardData, onOpenModal }) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        mb: 4,
        cursor: "move",
      }}
      className="card"
    >
      <Stack spacing={2}>
        <span style={{ color: "gray" }}>Question</span>
        <span>{cardData.question}</span>
        <span style={{ color: "gray" }}>Respondent option</span>
        <span>{cardData.selectedOption}</span>
        <span style={{ color: "gray" }}>Answer</span>
        <span>{cardData.answer}</span>
        <Button
          onClick={() => onOpenModal("edit", cardData.id)}
          size="small"
          variant="contained"
          color="warning"
        >
          Edit
        </Button>
        <Button
          onClick={() => onOpenModal("delete", cardData.id)}
          size="small"
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
