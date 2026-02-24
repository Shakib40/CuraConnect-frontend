import { useState } from "react";
import Table from "components/UI/Table";
import Modal from "components/UI/CustomModal";
import {
  Pencil,
  Trash2,
  Plus,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { Formik, Form } from "formik";
import Input from "../../../components/Form/Input";
import Select from "../../../components/Form/Select";
import DatePicker from "../../../components/Form/DatePicker";
import Textarea from "../../../components/Form/Textarea";

const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Jenkins",
    specialty: "Cardiology",
    date: "2026-03-01",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Mike Ross",
    specialty: "Orthopedics",
    date: "2026-03-05",
    time: "02:30 PM",
    status: "Pending",
  },
  {
    id: 3,
    doctor: "Dr. Emily Chen",
    specialty: "General Practice",
    date: "2026-02-15",
    time: "09:15 AM",
    status: "Completed",
  },
];

const mockDoctors = [
  { value: "dr_jenkins", label: "Dr. Sarah Jenkins - Cardiology" },
  { value: "dr_ross", label: "Dr. Mike Ross - Orthopedics" },
  { value: "dr_chen", label: "Dr. Emily Chen - General Practice" },
];

const Appointments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const columns = [
    { header: "Doctor", accessor: "doctor" },
    { header: "Specialty", accessor: "specialty" },
    {
      header: "Date & Time",
      render: (row) => (
        <div className="flex flex-col">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" /> {row.date}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3" /> {row.time}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Confirmed"
            ? "bg-green-100 text-green-700"
            : row.status === "Pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-slate-100 text-slate-700"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedAppointment(row);
              setIsEditModalOpen(true);
            }}
            className="p-1.5 text-sky-600 hover:bg-sky-50 rounded transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Cancel"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Appointments</h1>
          <p className="text-slate-500 mt-1">
            Manage your upcoming and past visits.
          </p>
        </div>
        <button
          onClick={() => setIsBookModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      <Table
        columns={columns}
        data={mockAppointments}
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />

      {/* Book Appointment Modal */}
      <Modal
        show={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Book New Appointment"
        size="lg"
      >
        <Formik
          initialValues={{ doctor: "", date: "", notes: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Booking:", values);
            setTimeout(() => {
              setSubmitting(false);
              setIsBookModalOpen(false);
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Select
                name="doctor"
                label="Select Doctor"
                options={mockDoctors}
                placeholder="Choose a physician..."
              />
              <DatePicker name="date" label="Preferred Date" />
              <Textarea
                name="notes"
                label="Reason for Visit (Optional)"
                placeholder="Briefly describe your symptoms or reason for visit."
                rows={3}
              />
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                >
                  {isSubmitting ? "Booking..." : "Confirm Request"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Edit Appointment Modal - Similar structure but pre-filled */}
      <Modal
        show={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Reschedule Appointment"
        size="lg"
      >
        <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 mb-4 flex items-start gap-2">
          <Clock className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            Rescheduling is subject to doctor availability. The clinic will
            confirm your new request.
          </p>
        </div>

        {selectedAppointment && (
          <Formik
            initialValues={{ date: selectedAppointment.date }}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Rescheduling:", values);
              setTimeout(() => {
                setSubmitting(false);
                setIsEditModalOpen(false);
              }, 1000);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-2">
                  <p className="font-medium text-slate-800">
                    {selectedAppointment.doctor}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedAppointment.specialty}
                  </p>
                </div>

                <DatePicker name="date" label="New Requested Date" />

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating..." : "Request Reschedule"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </div>
  );
};

export default Appointments;
