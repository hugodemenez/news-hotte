'use client'

import * as React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Pause, Play, Plus, Info, Trash, Search } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsOutlet {
  id: string
  name: string
  domain: string
  website: string
  creationDate: string
  owner: string
  contentType: string
  knownFor: string
}

interface Paragraph {
  subtitle: string
  content: string
}

interface GeneratedContent {
  title: string
  paragraphs: Paragraph[]
  audio: string
}

const newsOutletsList = [
  { 
    id: 'wsj', 
    name: 'Wall Street Journal', 
    domain: 'wsj.com',
    website: 'https://www.wsj.com',
    creationDate: '1889',
    owner: 'News Corp',
    contentType: 'Business and financial news',
    knownFor: 'In-depth financial reporting and conservative editorial stance'
  },
  { 
    id: 'nyt', 
    name: 'New York Times', 
    domain: 'nytimes.com',
    website: 'https://www.nytimes.com',
    creationDate: '1851',
    owner: 'The New York Times Company',
    contentType: 'General news, opinion, and features',
    knownFor: 'Pulitzer Prize-winning journalism and liberal editorial stance'
  },
  { 
    id: 'bbc', 
    name: 'BBC News', 
    domain: 'bbc.com',
    website: 'https://www.bbc.com/news',
    creationDate: '1922',
    owner: 'British Broadcasting Corporation',
    contentType: 'Global news and current affairs',
    knownFor: 'Impartial reporting and public service broadcasting'
  },
  { 
    id: 'cnn', 
    name: 'CNN', 
    domain: 'cnn.com',
    website: 'https://www.cnn.com',
    creationDate: '1980',
    owner: 'Warner Bros. Discovery',
    contentType: '24-hour news coverage and analysis',
    knownFor: 'Breaking news coverage and political analysis'
  },
]

export function NewsHotte() {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [newsOutlets, setNewsOutlets] = React.useState<NewsOutlet[]>(newsOutletsList.slice(0, 2))
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedOutlet, setSelectedOutlet] = React.useState<NewsOutlet | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [generatedContent, setGeneratedContent] = React.useState<GeneratedContent | null>(null)

  const themes = ['AI', 'Politics', 'Technology', '+Add theme']
  const durations = ['5min', '15min', '30min']
  const styles = ['Podcast', 'TV broadcast', 'Debate']

  const [selectedTheme, setSelectedTheme] = React.useState(themes[0])
  const [selectedDuration, setSelectedDuration] = React.useState(durations[0])
  const [selectedStyle, setSelectedStyle] = React.useState(styles[0])

  const filteredOutlets = newsOutletsList.filter(outlet => 
    outlet.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddOutlet = (outlet: NewsOutlet) => {
    if (!newsOutlets.find(o => o.id === outlet.id)) {
      setNewsOutlets([...newsOutlets, outlet])
    }
  }

  const handleDeleteOutlet = (id: string) => {
    setNewsOutlets(newsOutlets.filter(outlet => outlet.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIsExpanded(false)
    
    // Simulate API call with selected values
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newContent: GeneratedContent = {
      title: `${selectedTheme} News in ${selectedStyle} Style`,
      paragraphs: [
        {
          subtitle: `${selectedTheme} Insights`,
          content: `This is a ${selectedDuration} ${selectedStyle} about ${selectedTheme}. The content is generated based on the selected news outlets, theme, duration, and style.`
        },
        {
          subtitle: "Challenges and Opportunities",
          content: "While AI presents numerous opportunities for efficiency and innovation in journalism, it also raises important questions about accuracy, bias, and the role of human journalists in an increasingly automated industry."
        },
        {
          subtitle: "The Path Forward",
          content: "As we navigate this new era, finding the right balance between AI capabilities and human expertise will be crucial. The future of journalism likely lies in a hybrid model that leverages the strengths of both AI and human journalists."
        }
      ],
      audio: "mock_audio_url.mp3"
    }
    
    setGeneratedContent(newContent)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-100">
      <form onSubmit={handleSubmit} className="flex-none">
        <div className="sticky top-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="py-4">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4">
                  {newsOutlets.map((outlet) => (
                    <div key={outlet.id} className="flex flex-col items-center space-y-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Avatar className="h-12 w-12 border-2 border-orange-500 hover:border-orange-300 transition-colors cursor-pointer">
                            <AvatarImage src={`https://logo.clearbit.com/${outlet.domain}`} alt={outlet.name} />
                            <AvatarFallback className="bg-gray-700 text-gray-200">
                              {outlet.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => setSelectedOutlet(outlet)}>
                            <Info className="mr-2 h-4 w-4" />
                            <span>Info</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleDeleteOutlet(outlet.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Avatar className="h-12 w-12 border-2 border-orange-500 hover:border-orange-300 transition-colors cursor-pointer">
                        <AvatarFallback className="bg-gray-700 text-gray-200">
                          <Plus className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Add News Outlet</DrawerTitle>
                        <DrawerDescription>
                          Search and select a news outlet to add to your list.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <div className="flex items-center space-x-2">
                          <Search className="w-4 h-4 text-gray-500" />
                          <Input
                            placeholder="Search news outlets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <ScrollArea className="h-[300px] p-4">
                        {filteredOutlets.map((outlet) => (
                          <div key={outlet.id} className="flex items-center space-x-4 py-2">
                            <Avatar>
                              <AvatarImage src={`https://logo.clearbit.com/${outlet.domain}`} alt={outlet.name} />
                              <AvatarFallback>{outlet.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold">{outlet.name}</h4>
                              <p className="text-sm text-gray-500">{outlet.contentType}</p>
                            </div>
                            <Button size="sm" onClick={() => handleAddOutlet(outlet)}>Add</Button>
                          </div>
                        ))}
                      </ScrollArea>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[400px]' : 'max-h-0'}`}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Themes</div>
                  <div className="flex flex-wrap gap-2">
                    {themes.map((theme) => (
                      <Button
                        key={theme}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`${selectedTheme === theme ? 'bg-orange-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'} border-gray-600`}
                        onClick={() => setSelectedTheme(theme)}
                      >
                        {theme}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Duration</div>
                  <div className="flex flex-wrap gap-2">
                    {durations.map((duration) => (
                      <Button
                        key={duration}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`${selectedDuration === duration ? 'bg-orange-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'} border-gray-600`}
                        onClick={() => setSelectedDuration(duration)}
                      >
                        {duration}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Style</div>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((style) => (
                      <Button
                        key={style}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={`${selectedStyle === style ? 'bg-orange-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'} border-gray-600`}
                        onClick={() => setSelectedStyle(style)}
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate Hot News'}
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Collapse drawer" : "Expand drawer"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </form>

      <ScrollArea className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <Card className="p-4 bg-white shadow-md">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : generatedContent ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{generatedContent.title}</h2>
                {generatedContent.paragraphs.map((paragraph: Paragraph, index: number) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold">{paragraph.subtitle}</h3>
                    <p className="text-gray-600">{paragraph.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Your AI-generated hot news content will appear here after clicking generate...
              </p>
            )}
          </Card>
        </div>
      </ScrollArea>

      <div className="flex-none sticky bottom-0 inset-x-0 border-t bg-white p-4 shadow-md" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-700 hover:text-gray-900"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={!generatedContent || isLoading}
          >
            {isLoading ? (
              <Skeleton className="h-4 w-4 rounded-full" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <div className="flex-1">
            {isLoading ? (
              <Skeleton className="h-2 w-full" />
            ) : (
              <Slider
                value={[progress]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={([value]) => setProgress(value)}
                aria-label="Audio progress"
                disabled={!generatedContent}
              />
            )}
          </div>
          <div className="text-sm tabular-nums text-gray-600 w-16">
            {isLoading ? (
              <Skeleton className="h-4 w-full" />
            ) : (
              `${formatTime(progress * 7.03 / 100)}/${formatTime(7.03)}`
            )}
          </div>
        </div>
      </div>

      <Drawer open={selectedOutlet !== null} onOpenChange={() => setSelectedOutlet(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedOutlet?.name}</DrawerTitle>
            <DrawerDescription>News Outlet Information</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div>
              <Label className="text-sm font-medium">Website</Label>
              <p className="text-sm text-gray-500">{selectedOutlet?.website}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Date of Creation</Label>
              <p className="text-sm text-gray-500">{selectedOutlet?.creationDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Owned by</Label>
              <p className="text-sm text-gray-500">{selectedOutlet?.owner}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Type of Content</Label>
              <p className="text-sm text-gray-500">{selectedOutlet?.contentType}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Known for</Label>
              <p className="text-sm text-gray-500">{selectedOutlet?.knownFor}</p>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

function formatTime(time: number) {
  const minutes = Math.floor(time)
  const seconds = Math.floor((time - minutes) * 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}