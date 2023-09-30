import addEmployee from "@actions/employees/add-Employee";
import { Employee } from "types/employee";
import { Company } from "types/company";

//import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation";

export default function NewEmployeeForm() {
  async function handleSubmit(e: FormData) {
    "use server";

    // employee
    const firstName = e.get("firstName")?.toString();
    const lastName = e.get("lastName")?.toString();
    const age = Number(e.get("age")?.toString());
    // console.log("============>" + age)
    const gender = e.get("gender")?.toString();
    const email = e.get("email")?.toString();
    const phone = Number(e.get("phone")?.toString());
    const birthDate = e.get("birthDate")?.toLocaleString();
    //company
    const department = e.get("department")?.toString();
    const name = e.get("dname")?.toString();
    const title = e.get("title")?.toString();

    // check null and empty cases
    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !email ||
      !phone ||
      !birthDate ||
      !department ||
      !name ||
      !title
    )
      return;
    // obj
    const company: Company = {
      department,
      name,
      title,
    };
    const newEmployee: Employee = {
      firstName,
      lastName,
      age,
      gender,
      email,
      phone,
      birthDate: new Date(birthDate),
      company,
    };
    console.log("=============> " + newEmployee);
    await addEmployee(newEmployee);

    //revalidateTag("employees")
    redirect("/employees");
  }

  return (
    <div>
      <form action={handleSubmit}>
        <label>First name:</label>
        <input type="text" id="firstName" name="firstName" />
        <br /> <br />
        <label>Last name:</label>
        <input type="text" id="lastName" name="lastName" />
        <br /> <br />
        <label>Age:</label>
        <input type="number" id="age" name="age" />
        <br /> <br />
        <fieldset>
          <label>Gender:</label>
          <div className="same-line">
            <input type="radio" id="male" name="gender" value="HTML" />
            <label>Male</label>
          </div>
          <div className="same-line">
            <input type="radio" id="female" name="gender" value="female" />
            <label>Female</label>
          </div>
        </fieldset>
        <br /> <br />
        <label>Email:</label>
        <input type="email" id="email" name="email" />
        <br /> <br />
        <label>phone:</label>
        <input type="tel" id="phone" name="phone" />
        <br /> <br />
        <label>birthDate:</label>
        <input type="date" id="birthDate" name="birthDate" />
        <br /> <br />
        <fieldset>
          <h3>company</h3>
          <label>Choose a department:</label>
          <select id="department" name="department">
            <option value="administration">Administration</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="production">Production</option>
            <option value="logistic">Logistic</option>
          </select>
          <br /> <br />
          <label>name:</label>
          <input type="text" id="dname" name="dname" />
          <br /> <br />
          <label>title:</label>
          <input type="text" id="title" name="title" />
        </fieldset>
        <br /> <br />
        <button type="submit" className="form-btn">
          Save
        </button>
      </form>
    </div>
  );
}
