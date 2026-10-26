import Link from "next/link";
import { notFound } from "next/navigation";
import { Alert } from "@/components/common/Alert";
import { guardarAtencion } from "@/app/actions/atenciones";
import { AtencionForm } from "@/features/patients/AtencionForm";
import { createClient } from "@/lib/supabase/server";

export default async function NuevaAtencionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: paciente, error: pacienteError } = await supabase
    .from("paciente")
    .select("id, nombre, apellido_paterno, apellido_materno")
    .eq("id", id)
    .single();
  if (pacienteError?.code === "PGRST116") notFound();
  if (pacienteError || !paciente) return <Alert>No pudimos cargar la ficha del paciente.</Alert>;

  const { data: catalogo, error: catalogoError } = await supabase
    .from("catalogo_cie10")
    .select("codigo, nombre_diagnostico, categoria")
    .order("categoria")
    .order("codigo");

  if (catalogoError) {
    return <Alert>{`No pudimos cargar el catálogo CIE-10: ${[catalogoError.message, catalogoError.code && `SQLSTATE ${catalogoError.code}`].filter(Boolean).join(" · ")}`}</Alert>;
  }
  if (!catalogo?.length) return <Alert>El catálogo CIE-10 está vacío. Carga los diagnósticos antes de registrar atenciones.</Alert>;

  const nombreCompleto = `${paciente.nombre} ${paciente.apellido_paterno} ${paciente.apellido_materno ?? ""}`.trim();

  return (
    <>
      <header className="mb-8">
        <Link className="text-sm font-medium text-teal-700 hover:underline" href={`/patients/${id}`}>← Volver a la ficha</Link>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Registrar atención</h1>
        <p className="mt-2 text-slate-500">{nombreCompleto}</p>
      </header>
      <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <AtencionForm action={guardarAtencion} pacienteId={id} catalogo={catalogo} />
      </div>
    </>
  );
}
