import UpdateForm from "../../components/inventory/UpdateForm";

export default function UpdatePage() {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center">Update Appliance</h2>
                        <UpdateForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
