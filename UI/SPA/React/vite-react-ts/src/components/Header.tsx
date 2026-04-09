import SignIn from './SignIn';

export default function Header() {
  return (
    <header className="flex items-center">
      <span>My App</span>
      <div>
        <SignIn />
      </div>
    </header>
  );
}