'use server'

export async function getAllEmployees() { 
  const res = await fetch("http://localhost:8000/employees", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json" 
    },
    next: { tags: ["employees"] /*revalidate: 10 */ },
  }); 

  return res.json();
}
