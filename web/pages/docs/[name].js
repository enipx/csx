import { serialize } from 'next-mdx-remote/serialize'
import { getAllMdx, getMdxFile } from '../../utils/base'
import Title from '../../components/Title'
import Header from "../../components/Header"
import DocPage from '../../components/DocPage'

const MdxDisplay = ({ file }) => {
  return (
    <>
      <Title name={file.title} />
      <div className='container'>
        <Header navActive="1" />
        <DocPage file={file} />
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const file = getMdxFile(params, [
    "name",
    "title",
    "description",
    "content",
  ]);

  file.content = await serialize(file.content);

  return {
    props: { file }
  }
}

export const getStaticPaths = async () => {
  const files = getAllMdx(["name"]);
  
  return {
    paths: files.map((file) => {
      return {
        params: file,
      }
    }),
    fallback: false,
  }
}

export default MdxDisplay
