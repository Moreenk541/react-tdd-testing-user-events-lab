import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <h1>Newsletter Signup</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <fieldset>
            <legend>Select your interests:</legend>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Tech"
                onChange={handleChange}
              />
              Tech
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Travel"
                onChange={handleChange}
              />
              Travel
            </label>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Food"
                onChange={handleChange}
              />
              Food
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div role="alert">
          <p>Thank you, {formData.name}! You've signed up successfully.</p>
          {formData.interests.length > 0 && (
            <p>Your interests: {formData.interests.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
