"use server";
 
export async function deleteEmployee(id:number) {
  console.log("deleting employee .........") 

  await fetch(`http://localhost:8000/employees/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    cache: "no-store", 
    headers: {
      "Content-Type": "application/json" 
    },
    next: { tags: ["employee"] /*revalidate: 10 */ },
  })
  console.log("deletion is completed .........")
}
