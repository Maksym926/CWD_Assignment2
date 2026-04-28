import AddForm from "../../components/inventory/AddForm";
import Section from "@/app/components/inventory/Section";

export default function AddPage() {
    return (
        <Section
            title="Add New Appliance"
            component={<AddForm/>}
        />
    );
}
