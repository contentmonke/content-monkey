import Button from "./button/Button";


function ConfirmButton({ title, disabled, onClick }: any) {
  return (
    <Button
      label={title}
      onClick={() => onClick()}
      width={'160px'}
    />
  );
}

export default ConfirmButton;