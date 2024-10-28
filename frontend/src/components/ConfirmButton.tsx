import Button from "./button/Button";


function ConfirmButton({ title, onClick }: any) {
  return (
    <Button
      label={title}
      onClick={() => onClick()}
      width={'160px'}
    />
  );
}

export default ConfirmButton;