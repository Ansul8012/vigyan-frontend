import { AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function Library_view() {
  const { user, libraryUsers, maxSlots, bookSlot } = useAuthStore();

  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [fromPeriod, setFromPeriod] = useState("AM");
  const [toPeriod, setToPeriod] = useState("PM");

  const isRegistered = libraryUsers.find((u) => u.email === user?.email);

  const availableSlots = maxSlots - libraryUsers.length;

  const handleSubmit = () => {
    bookSlot({ studentId, fromTime, toTime, fromPeriod, toPeriod });
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* 🔥 TOP HEADER (OUTSIDE CARD) */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          BTech Library
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Graphic Era Deemed to be University, Dehradun, Uttarakhand
        </p>

        <p className="text-sm text-white/80 mt-3 italic max-w-xl mx-auto">
          “A reader lives a thousand lives before he dies. The man who never
          reads lives only one.”
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-gray-400">Students Inside</p>
              <h2 className="text-2xl font-bold text-blue-400">
                {libraryUsers.length}
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-sm text-gray-400">Available Slots</p>
              <h2 className="text-2xl font-bold text-purple-400">
                {availableSlots}
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-gray-400">Total Capacity</p>
              <h2 className="text-2xl font-bold text-green-400">{maxSlots}</h2>
            </div>
          </div>

          {/* ACTION */}
          <div className="flex justify-center">
            {!isRegistered ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg"
              >
                📚 Book a Slot in Library
              </motion.button>
            ) : (
              <div className="px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium">
                ✅ You already have a slot booked
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <h2 className="text-xl font-semibold mb-4">Book Your Slot</h2>

              <div className="flex flex-col gap-4">
                {/* Student ID */}
                <input
                  type="text"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                />

                {/* FROM */}
                <div className="flex gap-3">
                  <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:outline-none"
                  />
                  <select
                    value={fromPeriod}
                    onChange={(e) => setFromPeriod(e.target.value)}
                    className="px-3 rounded-lg bg-black/40 border border-white/10"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

                {/* TO */}
                <div className="flex gap-3">
                  <input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:outline-none"
                  />
                  <select
                    value={toPeriod}
                    onChange={(e) => setToPeriod(e.target.value)}
                    className="px-3 rounded-lg bg-black/40 border border-white/10"
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>

                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  className="mt-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Confirm Booking
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Library_view;
