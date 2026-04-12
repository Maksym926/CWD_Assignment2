import styles from "../../styles/booking.module.css";

// Displays the booking confirmation after a successful submission
// Shows movie name, today's date, showtime, and mobile number
// onReset prop allows the user to go back and make a new booking
export default function BookingConfirmation({data, onReset}) {
  return (
    <div className={styles.confirmation}>
      <h2>Booking Confirmed!</h2>
      <p>
        Your booking for <strong>{data.movie}</strong> on{" "}
        {/* Display today's date in Irish format (DD/MM/YYYY) */}
        <strong>{new Date().toLocaleDateString("en-IE")}</strong> at{" "}
        <strong>{data.showtime}</strong> has been confirmed.
        A confirmation text has been sent to <strong>{data.mobile}</strong>.
      </p>
      <button onClick={onReset}>Make new booking</button>
    </div>

  );
}
