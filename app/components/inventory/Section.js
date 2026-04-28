export default function Section({title, component}) {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h2 className="mb-4 text-center">{title}</h2>
                        {component}
                    </div>
                </div>
            </div>
        </div>
    );
}