import {AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {Dayjs} from "dayjs";

interface PatientNoteCardProps {
    index: string
    date?: Dayjs
}

export default function PatientNoteCard({index, date}: PatientNoteCardProps) {

    return (
        <AccordionItem value={index}>
            <AccordionTrigger>{date?.format('DD MMMM YYYY')}</AccordionTrigger>
            <AccordionContent className="prose dark:prose-invert max-w-none">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis iaculis ornare felis id ornare. Aenean in lectus eu arcu pellentesque suscipit. Etiam hendrerit enim eu urna tempus tempus. Nullam nibh magna, euismod placerat condimentum id, commodo et leo. Suspendisse ultricies, mi vitae mattis pulvinar, velit purus convallis mi, non consectetur magna lectus ut tellus. Vestibulum nec lectus pulvinar dui tempus vehicula. Ut mollis convallis interdum. Quisque a vestibulum elit. Aenean sit amet dolor mauris. Proin quis consequat augue, in dignissim nunc. Nunc finibus eu nunc ut ornare.</p>
                <p>Nullam sed tellus sodales, bibendum lorem non, varius augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam nec nibh consectetur, fermentum risus sed, ullamcorper dolor. Aenean vitae finibus felis. Morbi at leo arcu. Nullam a tempus dolor, id dignissim nunc. Fusce viverra nisl ut felis finibus, eu aliquam ligula feugiat. Curabitur lacinia mollis nulla, nec hendrerit ante elementum in. Quisque pellentesque efficitur pharetra. Donec bibendum orci quis sapien tempus maximus sit amet nec lectus. Integer ac euismod lacus, eget lobortis ligula. Praesent condimentum, neque sed lobortis venenatis, velit tellus porttitor ipsum, commodo fringilla tortor risus eget mauris. Praesent non turpis eget odio consectetur pulvinar viverra sit amet nisl. Duis luctus leo vel erat euismod scelerisque. Fusce consequat, metus at sodales maximus, est tellus aliquam magna, gravida gravida turpis nisl et lorem. Donec nec hendrerit metus, sed auctor odio.</p>
                <p>Morbi ut nunc in lorem rutrum aliquet. Curabitur nec eros nec lorem venenatis mollis. Nam pretium dapibus gravida. Donec tincidunt rhoncus erat, pulvinar tincidunt urna fermentum non. Nullam ac cursus erat. Sed facilisis mauris quis molestie fringilla. Morbi tristique lectus quis ante malesuada, quis pretium lorem consectetur. In rhoncus nisl massa. Nunc pulvinar turpis non mi posuere convallis. In feugiat non lorem ac sodales. Sed malesuada molestie felis et tincidunt. Suspendisse potenti. Aliquam a aliquam nunc. Sed justo lectus, suscipit et auctor vel, bibendum eget enim.</p>
            </AccordionContent>
        </AccordionItem>
    )
}