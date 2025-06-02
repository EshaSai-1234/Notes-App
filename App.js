# Notes-App
import tkinter as tk
from tkinter import messagebox
import json
import os

NOTES_FILE = "notes.json"

class NotesApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Notes App")
        self.root.geometry("800x600")
        self.notes = []

        # Left side input panel
        self.left_frame = tk.Frame(self.root, bg="#ddd", width=200)
        self.left_frame.pack(side=tk.LEFT, fill=tk.Y)

        self.title_entry = tk.Entry(self.left_frame, width=25)
        self.title_entry.insert(0, "Title")
        self.title_entry.pack(padx=10, pady=5)

        self.content_entry = tk.Text(self.left_frame, height=10, width=25)
        self.content_entry.pack(padx=10, pady=5)

        self.add_button = tk.Button(self.left_frame, text="Add Note", command=self.add_note)
        self.add_button.pack(padx=10, pady=5)

        # Right side for notes display
        self.notes_frame = tk.Frame(self.root, bg="white")
        self.notes_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

        self.load_notes()

    def add_note(self):
        title = self.title_entry.get()
        content = self.content_entry.get("1.0", tk.END).strip()

        if not title or not content:
            messagebox.showwarning("Missing Info", "Both Title and Content are required.")
            return

        note = {"title": title, "content": content}
        self.notes.append(note)
        self.save_notes()
        self.render_notes()

        # Clear inputs
        self.title_entry.delete(0, tk.END)
        self.content_entry.delete("1.0", tk.END)

    def delete_note(self, index):
        del self.notes[index]
        self.save_notes()
        self.render_notes()

    def render_notes(self):
        for widget in self.notes_frame.winfo_children():
            widget.destroy()

        for idx, note in enumerate(self.notes):
            card = tk.Frame(self.notes_frame, bg="#f0f0f0", bd=2, relief=tk.RIDGE)
            card.grid(row=idx // 3, column=idx % 3, padx=10, pady=10, sticky="nsew")

            title_label = tk.Label(card, text=note["title"], font=('Arial', 12, 'bold'), bg="#f0f0f0")
            title_label.pack(padx=5, pady=(5, 0))

            content_label = tk.Label(card, text=note["content"], wraplength=200, justify="left", bg="#f0f0f0")
            content_label.pack(padx=5, pady=5)

            delete_button = tk.Button(card, text="x", fg="red", command=lambda i=idx: self.delete_note(i))
            delete_button.pack(pady=5)

    def save_notes(self):
        with open(NOTES_FILE, "w") as f:
            json.dump(self.notes, f, indent=4)

    def load_notes(self):
        if os.path.exists(NOTES_FILE):
            with open(NOTES_FILE, "r") as f:
                self.notes = json.load(f)
        self.render_notes()

# Run the app
if __name__ == "__main__":
    root = tk.Tk()
    app = NotesApp(root)
    root.mainloop()


