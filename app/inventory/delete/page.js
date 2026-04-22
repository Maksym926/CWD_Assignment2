import DeleteForm from "@/app/components/inventory/DeleteForm";

export default function DeletePage() {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center">Delete Appliance</h2>
                        <DeleteForm />
                    </div>
                </div>
            </div>
        </div>
    )
}