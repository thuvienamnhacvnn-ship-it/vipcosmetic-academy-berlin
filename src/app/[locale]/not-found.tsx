import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="display text-5xl">404</h1>
      <Link href="/" className="btn btn-gold mt-6">
        Home
      </Link>
    </div>
  );
}
