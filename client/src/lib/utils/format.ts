function formatDate(date?: Date | null) {
  if (!date) return null;
  const newDate = typeof date === "string" ? new Date(date) : date;
  return newDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function lastMessageTimestamp(date: Date | string) {
  const newDate = typeof date === "string" ? new Date(date) : date;
  return newDate.toLocaleTimeString("it-IT", {
    timeStyle: "short",
  });
}

export { formatDate, lastMessageTimestamp };
