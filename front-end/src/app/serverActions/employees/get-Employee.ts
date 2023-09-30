"use server";

export async function getEmployeeById(id: string) {
  console.log("==> getEmployeeById Server Action");

  const response = await fetch(`http://localhost:8000/employees/${id}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    next: { tags: ["employee"] /*revalidate: 10 */ },
  })
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call)
    })
    .catch((error) => console.log(error));
  const result = await response;
  return result;
}
