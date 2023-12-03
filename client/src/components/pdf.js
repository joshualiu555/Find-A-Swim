import {Document, Page, Text} from "@react-pdf/renderer"

export const Pdf = ({name, stroke, distance, description}) => {
    return (
        <Document>
            <Page>
                <Text>{name}</Text>
                <Text>{stroke}</Text>
                <Text>{distance}</Text>
                <Text>{description}</Text>
            </Page>
        </Document>
    )
}
