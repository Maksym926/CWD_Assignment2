import SearchForm from "@/app/components/inventory/SearchForm";

export default function SearchPage() {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center">Search For Appliance</h2>
                        <SearchForm />
                    </div>
                </div>
            </div>
        </div>
    );
}