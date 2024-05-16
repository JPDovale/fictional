import { useProjects } from '@store/Projects'
import { ThreeActsInnerSession } from '../ThreeActsInnerSession'

export function ThreeActsSession() {
  const { currentProject } = useProjects((state) => ({
    currentProject: state.currentProject,
  }))

  if (currentProject?.features['multi-book'])
    return (
      <>
        {currentProject.books.map((book) => (
          <ThreeActsInnerSession
            key={book.id}
            multiBooksTitle={book.title}
            projectId={currentProject!.id}
            threeActsStructure={book.threeActsStructure}
          />
        ))}
      </>
    )

  return (
    <ThreeActsInnerSession
      projectId={currentProject!.id}
      threeActsStructure={currentProject?.books[0].threeActsStructure}
    />
  )
}
