import SearchForm from "@/app/components/inventory/SearchForm";
import Section from "@/app/components/inventory/Section";
export default function SearchPage() {
    return (
        <Section
            title="Search For Appliance"
            component={<SearchForm />}
        />
    );
}