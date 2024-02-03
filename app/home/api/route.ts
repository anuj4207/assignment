const BACKEDN_URL = process.env.BACKEND_URL || "http://127.0.0.1:3001";

export async function add(data: string) {
  const res = await fetch(`${BACKEDN_URL}/data/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data }),
  });
  const result = await res.json();
  return result;
}

export async function getData() {
  const res = await fetch(`${BACKEDN_URL}/data/myData`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function update(data: string, id: number) {
  const res = await fetch(`${BACKEDN_URL}/data/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: data, id: id }),
  });
  const result = await res.json();
  return result;
}
