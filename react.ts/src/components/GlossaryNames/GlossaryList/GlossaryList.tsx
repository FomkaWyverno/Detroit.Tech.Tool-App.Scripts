

export interface ItemTest {
    id: number
    code_person: string
    name: string
}
interface Props {}

function GlossaryList(props: Props) {
    const {} = props

    const items = [
        {
            id: 1,
            code_person: "X4324F",
            name: 'Даня'
        } as ItemTest,
        {
            id: 2,
            code_person: "X44F",
            name: 'Ден'
        } as ItemTest,
        {
            id: 3,
            code_person: "X4324F",
            name: 'Даня'
        } as ItemTest,
        {
            id: 4,
            code_person: "X44F",
            name: 'Ден'
        } as ItemTest,
        {
            id: 5,
            code_person: "X4324F",
            name: 'Даня'
        } as ItemTest,
        {
            id: 6,
            code_person: "X44F",
            name: 'Ден'
        } as ItemTest,
        {
            id: 7,
            code_person: "X4324F",
            name: 'Даня'
        } as ItemTest,
        {
            id: 8,
            code_person: "X44F",
            name: 'Ден'
        } as ItemTest
    ]

    const listItems = items.map((item) =>
        <li key={item.id}>
            <button>
                <span></span>
            </button>
            <span>{item.name}</span>
        </li>
    );

    return (
        <ul className="scrolling-y">{listItems}</ul>        
    )
}

export default GlossaryList
