import UpdateForm from "../../components/inventory/UpdateForm";
import Section from "@/app/components/inventory/Section";
export default function UpdatePage() {
    return (
        <Section
            title="Update Appliance"
            component={<UpdateForm />}
        />
    );
}
