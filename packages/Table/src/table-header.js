/**
 * colgroup,col很重要，因为要控制每一个列的相同宽度
 */
export default {
    render(h) {
        return  (<table>
            <caption>Superheros and sidekicks</caption>
            <colgroup>
                <col></col>
                <col span="2" class="batman"></col>
                <col span="2" class="flash"></col>
            </colgroup>
            <tr>
                <td> </td>
                <th scope="col">Batman</th>
                <th scope="col">Robin</th>
                <th scope="col">The Flash</th>
                <th scope="col">Kid Flash</th>
            </tr>
            <tr>
                <th>Skill</th>
                <td>Smarts</td>
                <td>Dex, acrobat</td>
                <td>Super speed</td>
                <td>Super speed</td>
            </tr>
        </table>)
    }
}