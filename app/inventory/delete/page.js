import DeleteForm from "@/app/components/inventory/DeleteForm";
import Section from "@/app/components/inventory/Section";

export default function DeletePage() {
    return (
        <Section
            title="Delete Appliance"
            component={<DeleteForm />}
        />
    )
}