// const MenuItem = ({ label, Icon, active, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${
//         active ? "bg-purple-200 text-purple-700 font-semibold" : "text-gray-700"
//       } hover:bg-purple-100 hover:text-purple-700 transition`}
//     >
//       <Icon size={20} />
//       <span>{label}</span>
//     </div>
//   );
// };

// export default MenuItem;
const MenuItem = ({ label, Icon, active, onClick }) => {
  return (
    <div
      className={`flex items-center px-6 py-3 cursor-pointer hover:bg-purple-100 ${
        active ? "bg-purple-200 font-semibold text-purple-700" : "text-gray-700"
      }`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </div>
  );
};

export default MenuItem;
