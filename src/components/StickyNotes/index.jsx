import { useState } from "react";
import { StickyNote, X, Plus, Edit, Trash2 } from "lucide-react";

const GlobalStickyNotes = () => {
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Critical Case Follow-up",
            description: "Follow up with Metro Medical Center regarding the billing dispute case. Need to ensure all documentation is properly filed.",
            createdDate: "2024-01-23T10:30:00Z",
            color: "bg-yellow-100 border-yellow-300"
        },
        {
            id: 2,
            title: "Supplier Contract Review",
            description: "Review MediCare Pharmaceuticals contract for Q2 2024. Focus on delivery timelines and quality standards.",
            createdDate: "2024-01-22T15:45:00Z",
            color: "bg-blue-100 border-blue-300"
        },
        {
            id: 3,
            title: "Insurance Policy Update",
            description: "HealthGuard Insurance policy changes need to be reviewed by end of week. Check coverage for telemedicine services.",
            createdDate: "2024-01-21T09:15:00Z",
            color: "bg-green-100 border-green-300"
        }
    ]);
    const [newNote, setNewNote] = useState({ title: "", description: "" });
    const [editingNote, setEditingNote] = useState(null);

    const addNote = () => {
        if (newNote.title.trim() && newNote.description.trim()) {
            const note = {
                id: Date.now(),
                title: newNote.title,
                description: newNote.description,
                createdDate: new Date().toISOString(),
                color: ["bg-yellow-100 border-yellow-300", "bg-blue-100 border-blue-300", "bg-green-100 border-green-300", "bg-pink-100 border-pink-300"][Math.floor(Math.random() * 4)]
            };
            setNotes([note, ...notes]);
            setNewNote({ title: "", description: "" });
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const updateNote = (id, updatedNote) => {
        setNotes(notes.map(note => 
            note.id === id ? { ...note, ...updatedNote } : note
        ));
        setEditingNote(null);
    };

    const formatNoteDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {/* Sticky Notes Button */}
            <button
                onClick={() => setShowNotes(!showNotes)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/600 transition-all hover:scale-110 flex items-center justify-center z-50"
                title="Sticky Notes"
            >
                <StickyNote className="w-6 h-6" />
            </button>

            {/* Sticky Notes Panel */}
            {showNotes && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-800">Sticky Notes</h2>
                                <button
                                    onClick={() => setShowNotes(false)}
                                    className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {/* Add New Note */}
                            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                                <h3 className="text-sm font-semibold text-slate-700 mb-3">Add New Note</h3>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Note title..."
                                        value={newNote.title}
                                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <textarea
                                        placeholder="Note description..."
                                        value={newNote.description}
                                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    />
                                    <button
                                        onClick={addNote}
                                        disabled={!newNote.title.trim() || !newNote.description.trim()}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Note
                                    </button>
                                </div>
                            </div>

                            {/* Notes Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {notes.map((note) => (
                                    <div key={note.id} className={`p-4 rounded-lg border-2 ${note.color} relative`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-slate-800 text-sm">{note.title}</h3>
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => setEditingNote(note.id)}
                                                    className="p-1 text-slate-600 hover:text-slate-800 hover:bg-white/50 rounded transition-colors"
                                                    title="Edit note"
                                                >
                                                    <Edit className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => deleteNote(note.id)}
                                                    className="p-1 text-red-600 hover:text-red-800 hover:bg-white/50 rounded transition-colors"
                                                    title="Delete note"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {editingNote === note.id ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={note.title}
                                                    onChange={(e) => updateNote(note.id, { title: e.target.value })}
                                                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                                <textarea
                                                    value={note.description}
                                                    onChange={(e) => updateNote(note.id, { description: e.target.value })}
                                                    rows={3}
                                                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                                />
                                                <button
                                                    onClick={() => setEditingNote(null)}
                                                    className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm text-slate-700 mb-3">{note.description}</p>
                                                <p className="text-xs text-slate-500">{formatNoteDate(note.createdDate)}</p>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {notes.length === 0 && (
                                <div className="text-center py-8">
                                    <StickyNote className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                                    <p className="text-slate-600">No notes yet. Create your first note above!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalStickyNotes;
