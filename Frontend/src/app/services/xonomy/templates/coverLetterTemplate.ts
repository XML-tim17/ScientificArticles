export const coverLetterTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<sc:cover-letter xmlns:sc="https://github.com/XML-tim17/ScientificArticles"
 xmlns:cl="cover-letter"
 xmlns:ns1="tsp"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xsi:schemaLocation="https://github.com/XML-tim17/ScientificArticles ./../../coverLetter.xsd">
    <sc:info>
        <sc:author>
			<sc:name>Aleksandar Nedaković</sc:name>
			<sc:institution>Fakultet Tehničkih Nauka</sc:institution>
			<sc:phone-number>0632772886</sc:phone-number>
			<sc:email>aleksandar.nedimovic@gmail.com</sc:email>
			<sc:address>
				<sc:city>Novi Sad</sc:city>
				<sc:country>Srbija</sc:country>
			</sc:address>
        </sc:author>
        <sc:date>2020-01-01</sc:date>
    </sc:info>
    <sc:content>
        <sc:paragraph>
            <sc:list sc:id="Lista za kupovinu">
                <sc:item>
                    Paradajz
                </sc:item>
                <sc:item>
                    Kupus
                </sc:item>
                <sc:item>
                    Hleb
                </sc:item>
                <sc:item>
                    Tunjevina
                </sc:item>
                <sc:item>
                    Balon
                </sc:item>
                <sc:item>
                    Zelena plasticna kanta
                </sc:item>
                <sc:item>
                    Oxygenxml editor
                    <sc:ref>http://www.oxygenxml.com/</sc:ref>
                </sc:item>
            </sc:list>
        </sc:paragraph>
    </sc:content>
    <sc:signature>
        <sc:name>Branislav Anđelić</sc:name>
        <sc:title>Mrs.</sc:title>
        <sc:institution>Fakultet Tehničkih Nauka</sc:institution>
    </sc:signature>
</sc:cover-letter>
`;